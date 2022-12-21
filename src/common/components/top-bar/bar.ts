import "./bar.css";
import { customElement, bindable } from "aurelia-framework";

@customElement('top-bar')
export class TopBar {
    @bindable title: string
}