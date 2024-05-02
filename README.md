# Recipe Api :fried_shrimp:	

## Team Members:
* Khaled Ramadan
* Mahmoud Essam
* Samar Mahmoud
* Esraa Said

## Recipe Program Functions:
### 1. getRecipe 
* **Description:** Get recipes based on specific optional criteria.
* **Route:** router.route('/').get(getRecipe)
* **Optional Parameters:** Contains optional query parameters for filtering recipes. It may include properties like:
    - name (string): match for recipe name (case-insensitive).
    - chefName (string): match for chef name (case-insensitive).
    - minPrice (number): Minimum price range.
    - maxPrice (number): Maximum price range.
    - sort (string): Sorting criteria ( "price" for ascending order, "-price" for descending order).
* **Returns:**
    - JSON object containing an array of matching recipes (on success).
    - Error message and appropriate status code (400 Bad Request) on failure.