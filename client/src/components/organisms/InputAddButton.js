import React from "react"
import AddButton from "../atoms/AddButton"
import Input from "../atoms/Input"
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
                <Input data-cypress id="inputStateName" />
                <AddButton
                    data-cypress
                    type="button"
                    value="+"
                    onClick={this.getStateName}
                />
                <div>
                    {this.state.nameEtat.map((name, index) => (
                        <div key={index}>
                            <LabelInputRange
                                data-cypress
                                label={name + ": "}
                                index={index}
                                idEtat="0"
                            />
                            <AddButton
                                data-cypress
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
