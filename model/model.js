export let recipes = [
	{
		id: "id1",
		name: "makarona bashamel",
		price: 90,
		chef_name: "ahmed",
		chef_id: "chefId1",
		Description: "A brief description or summary of the recipe.",
		ingredients: ["meet", "makrona", "bashamel", "milk"],
		instructions: " Step-by-step instructions on how to prepare the recipe. ",
		cooking_time: 20,
		Calories: 150,
	},
	{
		id: "id2",
		name: "test",
		price: 50,
		chef_name: "yara",
		chef_id: "chefId2",
		Description: "A brief description or summary of the recipe.",
		ingredients: ["meet", "makrona", "bashamel", "milk"],
		instructions: " Step-by-step instructions on how to prepare the recipe. ",
		cooking_time: 20,
		Calories: 150,
	},
];

export let chefs = [
	{
		id: "chefId1",
		chef_name: "ahmed",
		years_of_experience: "5",
		recipes: ["Pancakes", "Korean Spicy Chicken Rice Noodle Bake"]
	},
	{
		id: "chefId2",
		chef_name: "yara",
		years_of_experience: "2",
		recipes: ["Daffodil Cake", "Boston Cream Pie Cupcakes"]
	}
];

export let append_element = (ob) => {
	recipes.push(ob);
};
export let getl = () => {
	return recipes;
};

// module.exports = {setObject, getObject}
