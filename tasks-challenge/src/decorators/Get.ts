import { KeyValueStore } from "./../KeyValueStore.js";
import { ControllerFoundationConstructable } from "../foundation/ControllerFoundation.js";
import { buildRoutePath } from "../foundation/RouterBuilder.js";

export function GetController(path: string) {
  return function (
    target: ControllerFoundationConstructable,
    _context: ClassDecoratorContext
  ) {
    if (_context?.kind != "class")
      throw new Error("this decorator only works on classes");

    KeyValueStore.set(`getcontroller-${path}`, {
      instance: new target(),
      path: buildRoutePath(path),
      method: "GET",
    });
  };
}
