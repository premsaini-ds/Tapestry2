export const limit = 5; 
export const radius = 500;
export const defaultQuery = "";
export const baseApiUrl = "https://liveapi-sandbox.yext.com/v2/accounts/me";
export const liveAPIKey = "87476fe6f6e0b32b52ec673472ec246e";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
// export const savedFilterId = "54589289";
export const entityTypes = "location";
export const BaseUrl = "https://n7xmdxd5uc-134480-d.sbx.preview.pagescdn.com/";
//export const BaseUrl = "https://staging-fondly--nutty--goose-pgsdemo-com.preview.pagescdn.com";
export const googleMapsConfig =  {
    centerLatitude: 51.507351,
    centerLongitude:-0.127758,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"  
};  
export const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const WellSocialMediaUrls = {
    facebook: "https://www.facebook.com/PharmacyWell/",
    twitter: "https://twitter.com/wellpharmacy",
    instagram: "https://www.instagram.com/wellpharmacy/",
    linkedin: "https://www.linkedin.com/company/wellpharmacy/",
    tiktok : "#",   
  };

export function slugify(slugString:any){
    slugString.toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/, "");
    slugString = slugString.replaceAll("  ", "-");
    slugString = slugString.replaceAll(" ", "-");
    slugString = slugString.replaceAll("---","-");
    slugString = slugString.replaceAll("--","-");
    slugString = slugString.replaceAll("'","");
    return slugString.toLowerCase();
};
export function slugify1(slugString:any){
    slugString.charAt(0,9).toUpperCase() + slugString.slice(1). toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@_]/, " ");
    slugString = slugString.replaceAll("_", " ");
    return slugString.charAt(0,9).toUpperCase()+ slugString.slice(1). toLowerCase().toString();
};
export const defaultTimeZone = "Europe/London";
export const AnalyticsEnableDebugging  = true;
export const AnalyticsEnableTrackingCookie  = true;

export const AnswerExperienceConfig =  {
    experienceKey: "tapestry",
    locale:"en",
    apiKey: "2d7c79f7c0257eb1d29f626786f4a2c1",
    verticalKey: "locations",
    experienceVersion: "STAGING",
    sessionTrackingEnabled: true,
    endpoints:{
        universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
        verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
        questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
        universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
        verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
        filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
    }
};


