import React from "react";

interface MainLayoutProviderPros {
    children: React.ReactNode;
}

function MainLayoutProvider({ children }: MainLayoutProviderPros) {
    return (
        <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-lg overflow-auto">
            {children}
        </div>
    );
}

export default MainLayoutProvider;