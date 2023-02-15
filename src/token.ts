import puppeteer from "puppeteer";

const url = "http://user.teld.org/";

export let token: string;

get_token();

async function get_token() {
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    page.on("response", async (response) => {
      const is_login_page = page.url().includes("/newlogin");
      const is_GetRSAParameters = response
        .url()
        .includes("UserAPI-WEBUI-GetRSAParameters");

      if (is_login_page && is_GetRSAParameters) {
        // 输入
        await page.type(".userName", "17313007996");
        await page.type(".password", "zhl336191...");
        // 点击登录
        const login_btn = ".formDiv .loginButton";
        await page.waitForSelector(login_btn);
        await page.click(login_btn);
      }

      // 获取 cookies
      let cookies = await page.cookies();
      let o = cookies.find((i) => i.name == "telda");
      if (o) {
        token = o.value;
      }
    });

    await page.goto(url);
  } catch (error) {
    console.error("【异常3s后重试】", error);
    setTimeout(get_token, 3 * 1000);
  }
}
