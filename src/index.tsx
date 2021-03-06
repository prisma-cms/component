import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'

import Snackbar from './components/Snackbar'

import URI from 'urijs'

// TODO use more actual module
import i18n from 'roddeh-i18n'

import Context, { PrismaCmsContext } from '@prisma-cms/context'
import {
  PrismaCmsComponentError,
  PrismaCmsComponentProps,
  PrismaCmsComponentState,
} from './interfaces'
import { MutationOptions, QueryOptions } from '@apollo/client'
export * from './interfaces'

const defaultLocales = {
  ru: {
    values: {
      Error: 'Ошибка',
      Errors: 'Ошибки',
      'Request error': 'Ошибка выполнения запроса',
      'Check required forms fill in': 'Проверьте правильность заполнения формы',
    },
  },
}

// export default class PrismaCmsComponent<P extends PrismaCmsComponentProps = any, S extends PrismaCmsComponentState = any>
// extends PureComponent<P, S> {

export default class PrismaCmsComponent<
  P extends PrismaCmsComponentProps = PrismaCmsComponentProps,
  S extends PrismaCmsComponentState = PrismaCmsComponentState
> extends PureComponent<P, S> {
  static contextType = Context

  /**
   * PrismaCmsContext
   */
  declare context: PrismaCmsContext

  // static proptTypes = {
  //   locales: PropTypes.object,
  //   filters: PropTypes.object,
  //   errorDelay: PropTypes.number.isRequired,
  //   data: PropTypes.object,
  //   object: PropTypes.object,
  // }

  static defaultProps = {
    errorDelay: 5000,
  }

  constructor(props: P) {
    super(props)

    const { filters, locales } = this.props

    this.state = {
      ...this.state,
      locales: {},
      filters,
      errors: [],
      error: null,
      loading: false,
      notifications: [],
    }

    this.canEdit = this.canEdit.bind(this)
    this.getObject = this.getObject.bind(this)
    this.updateObject = this.updateObject.bind(this)
    this.mutate = this.mutate.bind(this)

    this.initLocales(defaultLocales)

    // if (locales) {
    this.initLocales(locales)
    // }
  }

  initLocales(locales: Record<string, any> | undefined) {
    if (locales) {
      for (const lang in locales) {
        const locale = locales[lang]

        if (locale) {
          this.addLexicon(lang, locale)
        }
      }
    }
  }

  createLexicon(locale: Record<string, any>) {
    return i18n.create(locale)
  }

  addLexicon(lang: string, locale: Record<string, any>) {
    const locales: Record<string, any> = this.state.locales

    if (!locales[lang] && locales && typeof locales === 'object') {
      locales[lang] = this.createLexicon(locale)
    } else {
      locales[lang].translator.add(locale)
    }

    return locales[lang]
  }

  lexicon(word: string, options?: Record<string, any>) {
    const { lang = 'en' } = this.context

    const { locales } = this.state

    return locales && locales[lang] ? locales[lang](word, options) : word
  }

  /**
   * @deprecated Will be remove in next major version
   */
  query(params: QueryOptions) {
    const { client } = this.context
    return client.query(params)
  }

  mutate(params: MutationOptions) {
    return this.request('mutate', params)
  }

  private async request(method: 'mutate', params: MutationOptions) {
    if (this.state.loading) {
      return
    }

    this.setState({
      loading: true,
    })

    const { client } = this.context

    const result = await client[method](params).catch((error: Error) => {
      error.message =
        (error.message && error.message.replace(/^GraphQL error: */, '')) || ''

      return error
    })

    this.setState({
      loading: false,
    })

    let error: Error | null = null
    let errors

    if (result instanceof Error) {
      // error = result.message;
      error = result
      // throw(result);
    } else {
      const { response } = result.data || {}

      const {
        success,
        message,
        errors: responseErrors,
        // ...other
      } = response || {}

      errors = responseErrors

      if (success !== undefined) {
        if (!success) {
          error = this.lexicon(message || 'Request error')
        }
      }
    }

    this.setState({
      errors,
    })

    if (error) {
      this.addError(error)
      throw result
    } else {
      this.setState({
        error: null,
      })
    }

    return result
  }

  // reloadApiData() {
  //   const { loadApiData } = this.context

  //   loadApiData && loadApiData()
  // }

  renderField(
    field: Record<string, any> & {
      props: Record<string, any> & {
        key?: string
      }
    }
  ): React.ReactNode | null {
    const { errors } = this.state

    const {
      // key,
      type: Field,
      props,
      // ...other,
    } = field

    const {
      key,
      name,
      label,
      helperText: helperTextProp,
      // onFocus,
      ...other
    } = props

    let helperText = helperTextProp

    // const error = errors ? errors.find((n) => n.key === name) : null;
    const error = errors
      ? errors.find((n) =>
          n.key !== undefined ? n.key === name : n.name === name
        )
      : null

    // return field;

    helperText = error ? error.message : helperText

    if (helperText) {
      helperText = this.lexicon(helperText)
    }

    return (
      <Field
        key={key}
        name={name}
        error={error ? true : false}
        helperText={helperText}
        label={label ? this.lexicon(label) : label}
        onFocus={this.onFocusBind}
        onChange={this.onChangeBind}
        {...other}
      />
    )
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value: valueProp, type, checked } = event.target

    let value: number | string | boolean | null | undefined = valueProp

    switch (type) {
      case 'boolean':
      case 'checkbox':
        value = checked
        break

      case 'number':
        value = Number(value)

        break

      default:
    }

    this.updateObject({
      [name]: value,
    })
  }

  onChangeBind = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.onChange(event)

  onFocus(event: React.FocusEvent<HTMLInputElement>) {
    const { name } = event.target

    if (name) {
      this.resetError(name)
    }

    return
  }

  onFocusBind = (event: React.FocusEvent<HTMLInputElement>) =>
    this.onFocus(event)

  resetError(name: string) {
    const { errors } = this.state

    if (errors) {
      const index = errors.findIndex((error) =>
        error.key !== undefined ? error.key === name : error.name === name
      )

      if (index !== -1) {
        const newErrors = errors.slice(0)

        newErrors.splice(index, 1)

        this.setState({
          errors: newErrors,
        })
      }
    }
  }

  updateObject(data: P['_dirty']) {
    const { _dirty } = this.state
    // const { onChange } = this.props;

    const newDirty = this.prepareDirty(
      data
        ? {
            ..._dirty,
            ...data,
          }
        : data
    )

    const newState = this.prepareNewState({
      _dirty: newDirty,
    })

    // this.setState(newState, () => {
    //   onChange && onChange(newDirty);
    // })

    this.setState(newState)
  }

  prepareDirty(data: P['_dirty']): P['_dirty'] | undefined {
    return data
  }

  prepareNewState<K extends keyof S>(
    newState: Pick<S, K> | S | null
  ): Pick<S, K> | S | null {
    return newState
  }

  // getHistory() {
  //   const {
  //     router: { history },
  //   } = this.context

  //   return history
  // }

  getLocation() {
    return global.location
  }

  getLocationUri() {
    const { pathname, search } = this.getLocation()

    return new URI(`${pathname}${search}`)
  }

  getLocationQuery(field: string) {
    return this.getLocationUri().query(true)[field]
  }

  onFilterFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    this.setFilters({
      [name]: value ? value : undefined,
    })
  }

  setFilters(data: Record<string, any>) {
    const { filters } = this.state

    this.setState({
      filters: {
        ...filters,
        ...data,
      },
    })
  }

  /**
   * Простая проверка выставлены ли фильтры или нет
   */
  hasFilters() {
    const filters = this.getFilters()

    return typeof filters &&
      filters === 'object' &&
      Object.keys(filters).length > 0
      ? true
      : false
  }

  /**
   * Получаем фильтры из адресной строки
   */
  getFilters() {
    const { filters } = this.state

    return filters || {}
  }

  addFilterCondition(where: Record<string, any>, key: string, value: any) {
    return Object.assign(where, {
      [key]: value,
    })
  }

  cleanFilters() {
    this.setState({
      filters: undefined,
    })
  }

  canEdit() {
    const object = this.getObject() ?? null

    if (object) {
      const { id: objectId, CreatedBy } = object

      const { id: currentUserId, sudo } = this.getCurrentUser() || {}

      const { id: createdById } = CreatedBy || {}

      if (objectId) {
        if (sudo || (createdById && createdById === currentUserId)) {
          return true
        }
      } else {
        return true
      }
    }

    return false
  }

  // getObject() {
  //   const { data, object } = this.props

  //   return object !== undefined ? object : (data && data.object) || null
  // }

  getObject() {
    // const { data, object } = this.props

    // return object !== undefined ? object : (data && data.object) || null

    return this.props.object
  }

  getCurrentUser() {
    const { user: currentUser } = this.context

    return currentUser
  }

  addError(error: PrismaCmsComponentError | string) {
    let _error: PrismaCmsComponentError

    const { errorDelay } = this.props

    if (typeof error === 'string') {
      _error = new Error(error)
    } else {
      _error = error
    }

    Object.assign(_error, {
      _id: new Date().getTime(),
    })

    const { notifications: oldNotifications } = this.state

    const notifications = (oldNotifications || []).slice(0)

    notifications.push(_error)

    if (errorDelay) {
      setTimeout(() => this.closeError(_error), errorDelay)
    }

    this.setState({
      notifications,
    })

    return error
  }

  removeError(error: PrismaCmsComponentError) {
    const { notifications: oldNotifications } = this.state

    if (oldNotifications && oldNotifications.length) {
      const notifications = oldNotifications.slice(0)

      const index = notifications.indexOf(error)

      if (index !== -1) {
        notifications.splice(index, 1)

        this.setState({
          notifications,
        })
      }
    }
  }

  closeError(error: PrismaCmsComponentError) {
    Object.assign(error, {
      open: false,
    })

    this.forceUpdate()

    setTimeout(() => {
      this.removeError(error)
    }, 2000)
  }

  closeErrorBind = (error: PrismaCmsComponentError) => this.closeError(error)

  renderErrors() {
    const { notifications } = this.state

    if (notifications && notifications.length) {
      const errors = notifications.map((error, index) => {
        const { _id, message, open = true } = error

        if (!message) {
          return null
        }

        return (
          <Snackbar
            key={_id || index}
            opened={open}
            error={error}
            message={this.lexicon(message)}
            close={this.closeErrorBind}
          />
        )
      })
      return errors
    } else {
      return null
    }
  }

  render(): React.ReactNode {
    const { children } = this.props

    return (
      <>
        {children}
        {this.renderErrors()}
      </>
    )
  }
}
