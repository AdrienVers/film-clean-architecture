import { nanoid } from "nanoid";

export interface IIDProvider {
	generate(): string;
}

export class SystemIDProvider implements IIDProvider {
	generate(): string {
		return nanoid();
	}
}

export class StubIDProvider implements IIDProvider {
	generate(): string {
		return "x";
	}
}
