import { Logger } from "@ng-mw/shared-react-components"
import FontFaceObserver from "fontfaceobserver"

export default async () => {
    try {
        await Promise.all([
            // Put the fonts you need to preload here
            /*
            new FontFaceObserver("Beatrice", {
                weight: "normal",
                style: "normal",
            }).load(),
            */
        ])
    } catch (e) {
        Logger.error("fontLoader", e)
    }
}
