import React from "react";
import ToyCard from "./ToyCard";

const ToyContainer = (props) => {
	return (
		<div id="toy-collection">
			{props.toyArray.map((element) => (
				<ToyCard
					toy={element}
					key={element.id}
					clickHandler={props.clickHandler}
					deleteClickHandler={props.deleteClickHandler}
				/>
			))}
		</div>
	);
};

export default ToyContainer;
