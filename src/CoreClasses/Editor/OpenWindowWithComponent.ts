import { UIComponents } from "./UI/UIComponents.js";

export class OpenWindowWithComponent {

    public static OpenWindowWithComp(component: HTMLElement): void {
        // Open a new window
        let winRef: Window | null = window.open("", "_blank", "width=600,height=400,scrollbars=yes,resizable=yes");

        if (winRef) {
              // Dynamically inject all necessary component scripts
              UIComponents.GetRegisteredComponents().forEach(comp => {
                const script = winRef.document.createElement('script');
                script.type = "module";
                script.src = "../src/CoreClasses/Editor/UI/" + comp.const.name + ".js";  // Assuming each component has a `scriptUrl` property
                script.onload = () => {
                    // Custom logic after script loading (if needed)
                };
                winRef.document.head.appendChild(script);
            });
       
            // Write the HTML content to the new window's document
            winRef.document.open();
            winRef.document.write(`<${component.tagName}>`);
            winRef.document.close();
        } else {
            console.error("Failed to open the new window.");
        }
    }
}
