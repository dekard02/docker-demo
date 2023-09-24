import {
  GameImageComponent,
  GameRectShapeComponent,
} from './game-component.class';

export class GameRenderer {
  components: (GameRectShapeComponent | GameImageComponent)[] = [];

  constructor(private readonly canvasCxt: CanvasRenderingContext2D) {}

  addComponent(component: GameRectShapeComponent | GameImageComponent) {
    this.components.push(component);
  }

  addComponents(
    ...components: (GameRectShapeComponent | GameImageComponent)[]
  ) {
    this.components.push(...components);
  }

  setComponents(
    ...components: (GameRectShapeComponent | GameImageComponent)[]
  ) {
    this.components = components;
  }

  removeComponent(
    removeComponent: GameRectShapeComponent | GameImageComponent
  ) {
    this.components.filter((component) => component === removeComponent);
  }

  render() {
    this.canvasCxt.reset();
    this.components.forEach((component) => {
      component.render(this.canvasCxt);
    });
  }
}
