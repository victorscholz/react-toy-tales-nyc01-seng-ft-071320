import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
	state = {
		display: false,
		toyArray: [],
	};

	handleClick = () => {
		let newBoolean = !this.state.display;
		this.setState({
			display: newBoolean,
		});
	};

	componentDidMount() {
		fetch("http://localhost:3000/toys")
			.then((response) => response.json())
			.then((data) => this.setState({ toyArray: data }));
	}

	newToy = (toyObj) => {
		let newToyObj = toyObj;
		newToyObj.likes = 0;

		const configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accepts: "application/json",
			},
			body: JSON.stringify(newToyObj),
		};

		fetch("http://localhost:3000/toys", configObj)
			.then((resp) => resp.json())
			.then((data) =>
				this.setState({
					toyArray: [data, ...this.state.toyArray],
				})
			);
	};

	clickHandler = (toy) => {
		const configObj = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accepts: "application/json",
			},
			body: JSON.stringify({
				...toy,
				likes: parseInt(toy.likes) + 1,
			}),
		};
		fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
			.then((resp) => resp.json())
			.then((updatedToy) => {
				const newToyArray = this.state.toyArray;
				const index = newToyArray.findIndex(
					(toy) => toy.id === updatedToy.id
				);
				newToyArray[index] = updatedToy;
				this.setState({ toyArray: newToyArray });
			});
	};

	deleteClickHandler = (toy) => {
		fetch(`http://localhost:3000/toys/${toy.id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				accepts: "application/json",
			},
			body: JSON.stringify(toy),
		})
			.then((res) => res.json())
			.then((currentToy) => {
				const updatedArray = this.state.toyArray.filter(
					(currentToy) => toy.id !== currentToy.id
				);
				this.setState({ toyArray: updatedArray });
			});
	};

	render() {
		return (
			<>
				<Header />
				{this.state.display ? (
					<ToyForm submitForm={this.newToy} />
				) : null}
				<div className="buttonContainer">
					<button onClick={this.handleClick}> Add a Toy </button>
				</div>
				<ToyContainer
					toyArray={this.state.toyArray}
					clickHandler={this.clickHandler}
					deleteClickHandler={this.deleteClickHandler}
				/>
			</>
		);
	}
}

export default App;
