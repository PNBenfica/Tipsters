import React from "react";

export default class TrendUsers extends React.Component {

  render() {

    return (
        <div class="trend-bar-item panel panel-default trendbar-users">

            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-users fa-fw"></i>Tipsters sugeridos</h3>
            </div>

            <div class="panel-body">

                <div class ="col-xs-12 trend-user media">
                    <div class="trend-user-tipster-image media-left">
                        <a href=""><img src="img/pauloteixeira.jpg" class="img-circle"></img></a>
                    </div>
                    <div class="panel-title media-body">
                        <a href="">Paulo Teixeira</a>
                        <p class="small-text">Is on a 5 green tips streak!</p>
                    </div>
                    <div class="media-right">
                        <button type="button" class="btn btn-default"><i class="fa fa-user-plus fa-fw"></i></button>
                    </div>
                </div> {/*<!-- user 1 -->*/}

                <div class ="col-xs-12 trend-user media">
                    <div class="trend-user-tipster-image media-left">
                        <a href=""><img src="img/joaoalmeida.jpg" class="img-circle"></img></a>
                    </div>
                    <div class="panel-title media-body">
                        <a href="">João Almeida</a>
                        <p class="small-text">Is on a 27 loosing streak!</p>
                    </div>
                    <div class="media-right">
                        <button type="button" class="btn btn-default"><i class="fa fa-user-plus fa-fw"></i></button>
                    </div>
                </div>  {/*<!-- user 2 -->*/}

                <div class ="col-xs-12 trend-user media">
                    <div class="trend-user-tipster-image media-left">
                        <a href=""><img src="img/joaoalmeida.jpg" class="img-circle"></img></a>
                    </div>
                    <div class="panel-title media-body">
                        <a href="">João Almeida</a>
                        <p class="small-text">Is on a 27 loosing streak!</p>
                    </div>
                    <div class="media-right">
                        <button type="button" class="btn btn-default"><i class="fa fa-user-plus fa-fw"></i></button>
                    </div>
                </div>  {/*<!-- user 3 -->*/}
                
            </div>  {/*<!-- panel-body -->*/}
            <div class="panel-footer">
                <button type="button" class="btn btn-default btn-block">Find More</button>
            </div>
        </div> 
    );
  }
}
