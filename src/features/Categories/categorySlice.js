import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategories,
  deleteCategories,
  updateCategories,
} from "../../app/api";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WineBarIcon from "@mui/icons-material/WineBar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const categoriesIconBank = [
  <AttachMoneyIcon />,
  <HomeIcon />,
  <DirectionsBikeIcon />,
  <ShoppingBasketIcon />,
  <RestaurantIcon />,
  <LocalHospitalIcon />,
  <SportsTennisIcon />,
  <LocalMoviesIcon />,
  <SportsEsportsIcon />,
  <CheckroomIcon />,
  <WineBarIcon />,
];

const initialState = {
  categories: [{ id: "numID", name: "Category name", iconID: 1 }],
};

export const fetchCategoriesThunk = createAsyncThunk(
  "Categories/fetchCategories",
  async () => {
    const { data } = await fetchCategories();
    return data;
  }
);

export const createExpenseThunk = createAsyncThunk(
  "Categories/createCategory",
  async (categories) => {
    const { data } = await createCategories(categories);
    return data;
  }
);

export const updateExpenseThunk = createAsyncThunk(
  "Categories/updateCategory",
  async (updatedExpense) => {
    const { data } = await updateCategories(updatedExpense);
    return data;
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "Categories/deleteCategory",
  async (id) => {
    const { data } = await deleteCategories(id);
    return data.id;
  }
);

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    builder.addCase(createExpenseThunk.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });

    builder.addCase(deleteExpenseThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    });

    builder.addCase(updateExpenseThunk.fulfilled, (state, action) => {
      const index = state.Categories.findIndex(
        (category) => category.id === action.payload.id
      );
      state.categories[index] = action.payload;
    });
  },
});

export default categoriesSlice.reducer;

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoryById = (categoryID) => (state) =>
  state.categories.categories.find(({ id }) => id === categoryID);
