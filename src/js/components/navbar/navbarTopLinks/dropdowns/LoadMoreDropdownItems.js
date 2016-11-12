import React from "react";

export default class LoadMoreDropdownItems extends React.Component {

  render() {

    return (
        <li>
            <a class="text-center col-xs-12 dropdown-load-more" href="#">
                <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            </a>
        </li>
    );
  }
}
