import React from "react"
import AddButton from "../atoms/AddButton"
import InputBase from "../atoms/InputBase"
import LabelInputRange from "../molecules/LabelInputRange"

class InputAddButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameEtat: []
        }
        this.getStateName = this.getStateName.bind(this)
    }

    getStateName() {
        let nameState = document.getElementById("inputStateName").value
        let tab = this.state.nameEtat
        tab.push(nameState)
        this.setState({ nameEtat: tab })
    }

    removeState(index) {
        console.log(index)
        const tab = this.state.nameEtat
        tab.splice(index, 1)
        this.setState({ nameEtat: tab })
    }

    render() {
        return (
            <div>
                <InputBase id="inputStateName" />
                <AddButton
                    type="button"
                    value="+"
                    onClick={this.getStateName}
                />
                <div>
                    {this.state.nameEtat.map((name, index) => (
                        <div key={index}>
                            <LabelInputRange
                                label={name + ": "}
                                index={index}
                            />
                            <AddButton
                                type="button"
                                value="-"
                                onClick={() => this.removeState(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default InputAddButton
