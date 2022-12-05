import { profileController } from "./profile_controller";

const controllerMap = {
    "profile": profileController,
}

function bindPageController(pageName) {
    const controllerFunc = controllerMap[pageName];
    if (controllerFunc) {
        controllerFunc();
    }
}

export { bindPageController } ;