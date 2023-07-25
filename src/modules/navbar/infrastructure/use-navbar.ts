import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

export const useNavbar = () => {
    const category = useSelector((state: AppState) => state.app.category);

    const getCategoryText = (category: string) => {
        switch (category) {
            case "owned":
                return "Mes films";
            case "desired":
                return "Prochains films";
            case "televised":
                return "Films TV";
            default:
                return "";
        }
    };

    const categoryText = getCategoryText(category);

    return { categoryText };
};
