import React from "react";

export default class SideBar extends React.Component {

  render() {

    const { location } = this.props;
    const feedClass = location.pathname === "/" ? "sidebar-item-active" : "";
    const profileClass = location.pathname.match(/^\/profile/) ? "sidebar-item-active" : "";
    const sportsClass = location.pathname.match(/^\/sports/) ? "sidebar-item-active" : "";
    const rankingsClass = location.pathname.match(/^\/rankings/) ? "sidebar-item-active" : "";

    return (

        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">

                    {/* Search - visible only in xs screens */}
                    <div class="col-sm-6 col-md-offset-1 col-lg-offset-2 visible-xs">
                        <form class="navbar-form" role="search">
                        <div class="input-group col-sm-10">
                            <input type="text" class="form-control" placeholder="Search for tipsters or sport events..." name="q"></input>
                            <div class="input-group-btn">
                                <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                        </form>
                    </div> {/* Search */}


                    {/*<!-- <li>    
                        <p style="height:20px;" class="hidden-xs"> </p>
                    </li> -->*/}

                    <li>
                        <a className={profileClass} href="#/profile"><i class="fa fa-user fa-fw"></i> Paulo Teixeira</a>
                    </li>

                    <li id="sidebar-account-money">
                        <a href="#"><i class="fa fa-money fa-fw"></i> Saldo: 20,00€<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a href="#"><img src="img/deposit.png"></img> Depositos</a>
                            </li>
                            <li>
                                <a href="#"><img src="img/widthdraw.png"></img> Levantamentos</a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-history fa-fw"></i> Historial</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <p style={{"height":"20px"}}> </p>
                    </li>

                    <li>
                        <a href="#" className={feedClass}><i class="fa fa-feed fa-fw"></i> News Feed</a>
                    </li>

                    <li>
                        <a id="sport-events-sidebar" className={sportsClass} href="#/sports"><i class="fa fa-soccer-ball-o fa-fw"></i> Sports<span class="fa arrow"></span></a>
                        
                        {/*<!-- sports list -->*/}
                        <ul class="nav nav-second-level">
                            <li class="active">
                                <a href="#/sports"><i class="fa fa-soccer-ball-o fa-fw"></i> Futebol <span class="fa arrow"></span></a>
                                
                                {/*<!-- main football leagues -->*/}
                                <ul class="nav nav-third-level">
                                    <li>
                                        <a href="#/sports/football/premier-league"><img src="img/sports/premierleague.png"></img> Premier League</a>
                                    </li>
                                    <li>
                                        <a href="#/sports/football/premier-league"><img src="img/sports/laliga.png"></img> La Liga</a>
                                    </li>
                                    <li>
                                        <a href="#/sports/football/premier-league"><img src="img/sports/bundesliga.png"></img> Bundesliga</a>
                                    </li>
                                    <li>
                                        <a href="#/sports/football/premier-league"><img src="img/sports/seriea.png"></img> Serie A</a>
                                    </li>
                                </ul>
                                {/*<!-- /.main football leagues -->*/}
                            </li>
                            <li>
                                <a href="#/sports"><img src="img/sports/tennis.png"></img> Tennis</a>
                            </li>
                            <li>
                                <a href="#/sports"><img src="img/sports/basket.png"></img> Basketball</a>
                            </li>
                            <li>
                                <a href="#/sports"><img src="img/sports/bike.png"></img> Ciclismo</a>
                            </li>
                            <li>
                                <a href="#/sports"><img src="img/sports/wheel.png"></img> Motor</a>
                            </li>
                        </ul>
                        {/*<!-- ./sports list -->*/}
                    </li>
                    <li>
                        <a href="#/rankings" className={rankingsClass}><i class="fa fa-bar-chart fa-fw"></i> Rankings</a>
                    </li>

                    <li>
                        <p style={{"height":"60px"}}> </p>
                    </li>
                </ul>
            </div>
            {/*<!-- /.sidebar-collapse -->*/}
        </div>
    );
  }
}
