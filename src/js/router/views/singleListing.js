import { getSingleListingFromApi } from "../../api/singleListing";

 
let params = new URL(document.location).searchParams;
export let id = params.get("id");


    getSingleListingFromApi(id);


