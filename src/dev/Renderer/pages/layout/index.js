import Context from "@prisma-cms/context";
import PrismaCmsComponent from '../../../../App';

class DevPageLayout extends PrismaCmsComponent {

  static contextType = Context;


  render(content = null) {

    return super.render(content);
  }
}


export default DevPageLayout;