/*
Copyright 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react'

export default React.createClass({
    getInitialState() {
        let newState = Object.assign({}, this.props.client);

        // Try loading the saved custom server address from the user's local storage
        if (newState.customizable && newState.homepage == '') {
          newState.homepage = window.localStorage.getItem(newState.name)
        }

        return newState
    },

    updateHomepage(event) {
      let newValue = event.target.value;

      localStorage.setItem(this.state.name, newValue)
      this.setState({ homepage: newValue });
    },

    render() {
        let link;
        if (this.props.linktype=='Room' && this.state.room_url) {
            link = this.state.room_url(this.props.entity);
        }
        else if (this.props.linktype=='RoomId' && this.state.room_id_url) {
            link = this.state.room_id_url(this.props.entity);
        }
        else if (this.props.linktype=='User' && this.state.user_url) {
            link = this.state.user_url(this.props.entity);
        }
        else if (this.props.linktype=='Msg' && this.state.msg_url) {
            link = this.state.msg_url(this.props.entity);
        }
        else if (this.props.linktype=='Group' && this.state.group_url) {
            link = this.state.group_url(this.props.entity);
        } else {
          return null;
        }

        if (this.state.customizable && !this.state.homepage) {
          link = null;
        }

        let logo;
        if (typeof this.state.logo === 'string') {
            logo = <img src={this.state.logo} />;
        } else {
            logo = <img {...this.state.logo} />;
        }

        let homepageLink
        if (this.state.customizable) {
            homepageLink = (
                <input type="url" placeholder="e.g.: https://riot.im/app" defaultValue={ this.state.homepage } onInput={ this.updateHomepage } />
            );
        } else {
            homepageLink = (
                <a href={ this.state.homepage }>{ this.state.homepage }</a>
            );
        }

        return (
            <div key={ this.state.name } className="mxt_HomePage_link">
                <div className="mxt_HomePage_link_logo">
                    <a href={ link }>{ logo }</a>
                </div>
                <div className="mxt_HomePage_link_name">
                    <a href={ link }>{ this.state.name }</a>
                    <div className="mxt_HomePage_link_homepage">
                        { homepageLink }
                    </div>
                </div>
                <div className="mxt_HomePage_link_comments">
                    { this.state.comments }
                </div>
                <div className="mxt_HomePage_link_author">
                    { this.state.author }
                </div>
                <div className="mxt_HomePage_link_maturity">
                    { this.state.maturity }
                </div>
                <div className="mxt_HomePage_link_link">
                    { link ? <a href={ link }>{ link }</a> : null }
                </div>
            </div>
        );

    }
})
