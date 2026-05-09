// create troken and saving that in cookie
const sendShopToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookie
  const isProd = process.env.NODE_ENV === "production";
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  };
  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendShopToken;
