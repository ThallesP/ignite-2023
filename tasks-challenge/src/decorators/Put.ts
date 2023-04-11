import { KeyValueStore } from "./../KeyValueStore.js";
import { ControllerFoundationConstructable } from "../foundation/ControllerFoundation.js";
import { buildRoutePath } from "../foundation/RouterBuilder.js";

export function PutController(path: string) {
  return function (
    target: ControllerFoundationConstructable,
    _context: ClassDecoratorContext
  ) {
    if (_context?.kind != "class")
      throw new Error("this decorator only works on classes");

    KeyValueStore.set(`putcontroller-${path}`, {
      instance: new target(),
      path: buildRoutePath(path),
      method: "PUT",
    });
  };
}
