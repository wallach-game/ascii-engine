import { UIComponent } from "./UI/UIComponent.js";

export class OpenWindowWithComponent {

    public static OpenWindowWithComp(component: UIComponent): void {
        // Open a new window
        let winRef: Window | null = window.open("", "_blank", "width=600,height=400,scrollbars=yes,resizable=yes");

        if (winRef) {
            // Create HTML content
            const htmlContent = component.GetComponent().innerHTML;

            // Write the HTML content to the new window's document
            winRef.document.open();
            winRef.document.write(htmlContent);
            winRef.document.close();
        } else {
            console.error("Failed to open the new window.");
        }
    }
}
