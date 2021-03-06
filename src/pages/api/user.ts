import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";

const User = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const userData = request.session.get("user");
  if (userData) {
    // do we need to fetch any information about the user?
    response.json({
      isLoggedIn: true,
      ...userData
    });
  } else {
    response.json({
      isLoggedIn: false
    });
  }
});

export default User;
