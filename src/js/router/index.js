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
      case "/minside/redigerannonse/":
        await import("./views/editListing.js/");
        break;
      case "/minside/minekjop/":
        await import("./views/myWins.js/");
        break;
      case "/minside/minebud/":
        await import("./views/myBids.js/");
        break;
      case "/enkelpost/":
        await import("./views/singleListing.js/");
        break;
      default:
        await import("./views/notFound.js");
    }
  }
