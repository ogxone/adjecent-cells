import { Controller, Render } from "routing-controllers";

@Controller("/")
@Render("index")
class IndexController {
  home() {
    return { title: "Express" };
  }
}

export {IndexController}