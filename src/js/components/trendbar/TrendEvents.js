import React from "react";

export default class TrendEvents extends React.Component {

  render() {

    return (
    <div class="trend-bar-item panel panel-default with-nav-tabs">

        <div class="panel-heading">
            <h3 class="panel-title"><i class="fa fa-line-chart fa-fw"></i>Trends</h3>
        </div>

        <div class="panel-body">
            <ul class="list-group">
                <li class="list-group-item"><a href="#">Real Madrid vs Barcelona</a></li>
                <li class="list-group-item"><a href="#">Leicester vs Norwich</a></li>
                <li class="list-group-item"><a href="#">Bayern Munique vs Benfica</a></li>
                <li class="list-group-item"><a href="#">Reading vs Burnley</a></li>
                <li class="list-group-item"><a href="#">Federer vs Nadal</a></li>
            </ul>
        </div>
    </div>
    );
  }
}
