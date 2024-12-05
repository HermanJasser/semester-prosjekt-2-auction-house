export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/login/":
        await import("./views/login.js");
        break;
      case "/register/":
        await import("./views/register.js");
        break;
      case "/minside/":
        await import("./views/myPage.js");
        break;
      case "/minside/nyannonse/":
        await import("./views/newPost.js");
        break;
      case "/minside/redigerprofil/":
        await import("./views/editProfile.js/");
        break;
      case "/enkelpost/":
        await import("./views/singleListing.js/");
        break;
      default:
        await import("./views/notFound.js");
    }
  }
