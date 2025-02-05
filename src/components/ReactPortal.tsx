import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps extends React.PropsWithChildren {
    wrapperId: string;
}

/**
 * A function to create a portal on the page. Generally used for modals. 
 * @param wrapperId: The target element that the modal will be appended to
 */
export default function ReactPortal({ children, wrapperId }: ReactPortalProps) {

    const [target, setTarget] = useState<HTMLElement | null>(null);

    // Using useLayoutEffect since we're manipulating the DOM syncronously
    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let autoCreated = false;
        if (!element) {
            element = createWrapperAndAppendToBody(wrapperId);
            autoCreated = true;
        }
        setTarget(element);

        return () => {
            // If the system created it, we want to remove it when the component unmounts
            if (autoCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

    }, [wrapperId]);

    if (!target) {
        return null;
    }

    return createPortal(children, target);
}

/** Helper function for the modal to append its container to the body if needed */
function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}