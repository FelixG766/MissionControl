import React from "react";

interface MainLayoutProviderPros {
    children: React.ReactNode;
}

function MainLayoutProvider({ children }: MainLayoutProviderPros) {
    return (
        <div>
            {children}
        </div>
    );
}

export default MainLayoutProvider;