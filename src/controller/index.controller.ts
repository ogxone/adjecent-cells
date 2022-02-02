import { Controller, Get, Render } from "routing-controllers";

@Controller()
class IndexController {
  @Get('/')
  @Render("index")
  home() {
    return { title: "Adjecent boxes", xDim: 10, yDim: 10 };
  }
}

export { IndexController }