import { SystemIDProvider } from "@/utils/id-provider";
import { AppStore, createStore } from "../../store/store";
import { Dependencies } from "../../store/dependencies";

export class App {
	public dependencies: Dependencies;
	public store: AppStore;

	constructor() {
		this.dependencies = this.setupDependencies();
		this.store = createStore({ dependencies: this.dependencies });
	}

	setupDependencies(): Dependencies {
		return {
			idProvider: new SystemIDProvider(),
		};
	}
}

export const app = new App();
