import React from "react";

export default class LoadMoreDropdownItems extends React.Component {

  render() {

    return (
        <li>
            <a class="text-center col-xs-12" href="#" style={{"paddingTop": "0px !important", "paddingBottom":"0px !important"}}>
                <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            </a>
        </li>
    );
  }
}
