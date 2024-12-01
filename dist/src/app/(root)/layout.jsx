import React from "react";
var Layout = function (_a) {
    var children = _a.children;
    return (<main className="root">
      {/* <MobileNav />
        <Sidebar /> */}
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
      {/* <Toaster /> */}
    </main>);
};
export default Layout;
