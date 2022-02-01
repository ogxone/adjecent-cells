import { Controller, Get, Render } from "routing-controllers";

@Controller()
class IndexController {
  @Get('/')
  @Render("index")
  home() {
    return { title: "Express11", xDim: 10, yDim: 10 };
  }
}

export { IndexController }