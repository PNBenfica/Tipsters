import React from "react"

import classNames from "classnames"

import Button from "../../Button"
import Section from "../../Section"

export default class About extends React.Component {

    renderEditingAbout(){

        const { editingProfile, onInputChange, openEdit, text, save, state } = this.props

        if (editingProfile){

            let currentText = state.edited? state.text : text

            return (
                <div class="col-xs-12 edit-about">
                    <Button title="Editar" onClick={openEdit} />
                    <div class={classNames("col-xs-12 content", {open : state.editing})}>
                        <textarea rows="4" placeholder="Write something about yourself..." value={currentText} onChange={onInputChange} />
                        <Button title="Salvar" onClick={save} />
                    </div>
                </div>
            )
        }

    }

    render() {

    	const { text } = this.props

        return (
            <div class="col-xs-12">
                <Section title="About" id="profile-about-section">
                    {text}
                    {this.renderEditingAbout()}
                </Section>
            </div>
        );
    }
}
