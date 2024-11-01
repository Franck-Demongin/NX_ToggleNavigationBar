/**
 * NX_ToggleNavigationBar.js
 */

import { app } from "../../../scripts/app.js"
import { $el } from "../../../scripts/ui.js";

let HIDDEN = false;

app.registerExtension({
	name: 'NX_ToggleNavigationBar',
	async setup(app) {

		const showButton = $el("button.comfy-settings-btn", {
			textContent: "🖼️",
			style: {
				right: "16px",
				left: "16px",
				cursor: "pointer",
				display: "none",
			},
		});

		const updateButtonState = () => {
			showMenuButton.icon = HIDDEN ? "eye-off" : "eye";
			showMenuButton.tooltip = HIDDEN ? "Show Navigation Bar" : "Hide Navigation Bar";
			showMenuButton.content = HIDDEN ? "" : "";
		};

		showButton.onclick = () => {
			if (!HIDDEN) {
				document.querySelectorAll("[pc35]")[0].style.display = 'none';
			}
			else {
				document.querySelectorAll("[pc35]")[0].style.display = 'block';
			}
			HIDDEN = !HIDDEN;
			updateButtonState();
		};

		let showMenuButton;
		if (!app.menu?.element.style.display && app.menu?.settingsGroup) {
			showMenuButton = new (await import("../../../scripts/ui/components/button.js")).ComfyButton({
				icon: "eye",
				action: () => {
					showButton.click();
				},
				tooltip: "Hide Navigation Bar",
				content: "",
			});
			app.menu.settingsGroup.append(showMenuButton);
		}
	}
})