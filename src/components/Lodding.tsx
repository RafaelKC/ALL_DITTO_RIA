import React from "react";
import {Spinner} from "@nextui-org/react";

export type LoadingProps = React.ComponentProps<'svg'> & {
    loaded: boolean;
}

export const Loading: React.FC<LoadingProps> = ({loaded, ...props}) => {
    return (<>
        {loaded ? props.children : <Spinner className="h-full w-full" color="primary" />}
    </>)
}