import React from "react";

import Post from "../components/post/Post";
import TrendEvents from "../components/trendbar/TrendEvents";
import TrendUsers from "../components/trendbar/TrendUsers";

export default class Profile extends React.Component {
  render() {
    return (

        <div class="row">

          {/*<!-- profile info details -->*/}
          <div id="profile-info" class="col-md-8">

              {/*<!-- profile details -->*/}
            <div class="panel panel-default col-md-5" id="profile-info-details">
                  <div class="panel-heading clearfix col-xs-12 media">

                      <div class="profile-user-img media-left">
                          <div><a href="#"><img src="img/joaoalmeida.jpg"></img></a></div>
                      </div>
                      <div class="media-body">
                          <p class="panel-title">João Almeida</p>
                          <small><i class="fa fa-map-marker fa-fw"></i> Rinchoa, Portugal</small>
                      </div>
                       
                  </div>

                <div class="panel-body">
                    
                    {/*<!-- <div class="col-xs-12 green"> -->*/}
                      <div class="col-xs-4">
                              <p>124</p>
                        <span>Followers</span>
                      </div>
                      <div class="col-xs-4">
                              <p>6</p>
                        <span>Following</span>
                      </div>
                      <div class="col-xs-4">
                              <p>65</p>
                        <span>Tips</span>
                      </div>
                    {/*<!-- </div> -->*/}

                </div>

                  <div class="panel-footer col-md-12">
                      <div class="row">
                          <button type="button" class="btn btn-default col-xs-3 col-xs-push-2"><i class="fa fa-user-plus fa-fw"></i></button>
                          <button type="button" class="btn btn-default col-xs-3 col-xs-push-4"><i class="fa fa-comments fa-fw"></i></button>
                      </div>
                  </div>
            </div> {/*<!-- profile details -->*/}


              {/*<!-- profile stats -->*/}
              <div class="panel panel-default profile-stats col-md-5 col-md-push-1">
                  <div class="panel-heading clearfix">

                      <div class="panel-title"> <span class="glyphicon glyphicon-stats"></span> Estatisticas </div>

                  </div>

                  <div class="panel-body">
                      
                      <div class="col-xs-12">
                          <div class="col-xs-4">
                              <h5>ROI</h5>
                              <span>5.23%</span>
                          </div>
                          <div class="col-xs-4">
                              <h5>Streak</h5>
                              <span>6</span>
                          </div>
                          <div class="col-xs-4">
                              <h5>Win %</h5>
                              <span>20.5%</span>
                          </div>
                          <div class="col-xs-6">
                              <h5>Avg Win Odds</h5>
                              <span>1.26</span>
                          </div>
                          <div class="col-xs-6" id="profile-prefered-sports">
                              <h5>More tips on</h5>
                              <span><i class="fa fa-soccer-ball-o fa-fw"></i> Football</span>
                          </div>
                      </div>
                  </div>
              </div> {/*<!-- profile stats -->*/}


              <div class="col-lg-10" id="profile-posts-divider"></div>


              {/*<!-- posts -->*/}
              <div class="col-lg-10 col-md-8 col-lg-push-1 feed-container">
                  
                  <Post />

                  <Post />
                  
                  <Post />

              </div>


          </div> {/*<!-- profile info details -->*/}


          <div class="col-md-4 col-lg-push-0 hidden-xs hidden-sm trend-bar-container">
                <TrendEvents />
                <TrendUsers />
          </div>

        </div>
    );
  }
}
