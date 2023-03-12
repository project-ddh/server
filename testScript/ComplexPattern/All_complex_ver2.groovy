import static net.grinder.script.Grinder.grinder
import static org.junit.Assert.*
import static org.hamcrest.Matchers.*
import net.grinder.script.GTest
import net.grinder.script.Grinder
import net.grinder.scriptengine.groovy.junit.GrinderRunner
import net.grinder.scriptengine.groovy.junit.annotation.BeforeProcess
import net.grinder.scriptengine.groovy.junit.annotation.BeforeThread
import org.junit.Before
import org.junit.BeforeClass
import org.junit.Test
import org.junit.runner.RunWith

import org.ngrinder.http.HTTPRequest
import org.ngrinder.http.HTTPRequestControl
import org.ngrinder.http.HTTPResponse
import org.ngrinder.http.cookie.Cookie
import org.ngrinder.http.cookie.CookieManager
import org.json.JSONObject;

@RunWith(GrinderRunner)
class TestRunner {

	public static GTest LoginMain
	public static GTest GetDetail
	public static GTest PostBids
	public static GTest GetMain2
	public static GTest GetDetail2
	public static GTest GetMain3
	public static GTest GetDetail3
    public static HTTPRequest request
    public static Map<String, String> headers = [:]
    public static List<Cookie> cookies = []

    @BeforeProcess
    public static void beforeProcess() {
        HTTPRequestControl.setConnectionTimeout(300000)
        LoginMain = new GTest(1, "Login Squence")
		GetDetail = new GTest(2, "Get Detail1")
		PostBids = new GTest(3, "Post Bids")
		GetMain2 = new GTest(4, "Get Main2")
		GetDetail2 = new GTest(5, "Get Detail2")
		GetMain3 = new GTest(6, "Get Main3")
		GetDetail3 = new GTest(7, "Get Detail3")
        request = new HTTPRequest()
        grinder.logger.info("before process.")
    }

    @BeforeThread
    public void beforeThread() {
        LoginMain.record(this, "Login Squence")
		GetDetail.record(this, "Get Detail1")
		PostBids.record(this, "Post Bids")
		GetMain2.record(this, "Get Main2")
		GetDetail2.record(this, "Get Detail2")
		GetMain3.record(this, "Get Main3")
		GetDetail3.record(this, "Get Detail3")
        grinder.statistics.delayReports = true
        grinder.logger.info("before thread.")
    }

    @Before
    public void before() {
        request.setHeaders(headers)
        CookieManager.addCookies(cookies)
        grinder.logger.info("before. init headers and cookies")
    }


	@Test
	public void LoginMain() {
		int user = new Random().nextInt(200000 - 1) + 1;
		int raffleId = new Random().nextInt(10000 - 9001) + 9001;
		//int sleeptime = new Random().nextInt(2000 - 1);
		int login_interval = new Random().nextInt(2000-1);
		Map<String, Object> request_data = ["userId": "user"+user, "password": "user"+user]
		//Thread.sleep(login_interval)
		HTTPResponse response = request.POST("http://118.67.143.29/users/login", request_data)
		grinder.logger.info('PostLogin')
		if (response.statusCode == 301 || response.statusCode == 302) {
			grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", response.statusCode)
		} else {
			assertThat(response.statusCode, is(201))
		}
		
		JSONObject bodyObject = new JSONObject(response.getBodyText())
		int usersId = bodyObject.getInt("usersId");

		HTTPResponse responseMain = request.GET("http://118.67.143.29/raffles/rediscloud")
		grinder.logger.info('GetMain1')
		if (responseMain.statusCode == 301 || responseMain.statusCode == 302) {
			grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain.statusCode)
		} else {
			assertThat(responseMain.statusCode, is(200))
		}
		
		//Thread.sleep(sleeptime)
	}
		
	@Test		
	public void GetDetail() {
		int sleeptime = new Random().nextInt(2000 - 1);
		int raffleId = new Random().nextInt(10000 - 9001) + 9001;
		grinder.logger.info('GetDetail')
		HTTPResponse responseDetail = request.GET("http://118.67.143.29/raffles/"+ raffleId)
		if (responseDetail.statusCode == 301 || responseDetail.statusCode == 302) {
			grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail.statusCode)
		} else {
			assertThat(responseDetail.statusCode, is(200))
		}
		//Thread.sleep(sleeptime)
	}
	@Test
	public void PostBids() {   
		int i
		int users = new Random().nextInt(200000 - 1) + 1;
		int raffleId = new Random().nextInt(10000 - 9001) + 9001;
		int amount = (new Random().nextInt(901)+100)*1000;
		int bidsize = (new Random().nextInt(11)+50)*5;
		Map<String, Object> request_raffle = ["amount": amount, "raffleId" : raffleId, "user" : users, "bidSize":bidsize]
		grinder.logger.info('PostBids')
		for (i = 0; i < 5; i++) {
			HTTPResponse requestBid = request.POST("http://118.67.143.29/raffles/bid", request_raffle)
			if (requestBid.statusCode == 301 || requestBid.statusCode == 302) {
			   requestBid.logger.warn("Warning. The response may not be correct. The response code was {}.", requestBid.statusCode)
			} else {
				assertThat(requestBid.statusCode, is(201))
			}
		}
	}
	@Test  
	public void GetMain2() {
		int sleeptime = new Random().nextInt(2000 - 1);
		HTTPResponse responseMain2 = request.GET("http://118.67.143.29/raffles/rediscloud")
		grinder.logger.info('GetMain2')
			if (responseMain2.statusCode == 301 || responseMain2.statusCode == 302) {
				grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain2.statusCode)
			} else {
				  assertThat(responseMain2.statusCode, is(200))
			}
		//Thread.sleep(sleeptime)
	}
	@Test
	public void GetDetail2() {
		int raffleId = new Random().nextInt(10000 - 9001) + 9001
		int sleeptime = new Random().nextInt(2000 - 1);
		HTTPResponse responseDetail2 = request.GET("http://118.67.143.29/raffles/"+ raffleId)
		grinder.logger.info('GetDetail2')
			if (responseDetail2.statusCode == 301 || responseDetail2.statusCode == 302) {
				grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail2.statusCode)
		} else {
			assertThat(responseDetail2.statusCode, is(200))
		}
		//Thread.sleep(sleeptime)
	}
	@Test
	public void GetMain3() {
		int sleeptime = new Random().nextInt(2000 - 1);
		HTTPResponse responseMain3 = request.GET("http://118.67.143.29/raffles/rediscloud")
		grinder.logger.info('GetMain3')
			if (responseMain3.statusCode == 301 || responseMain3.statusCode == 302) {
				  grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain3.statusCode)
			} else {
				  assertThat(responseMain3.statusCode, is(200))
			}   
		//Thread.sleep(sleeptime)
	}
	@Test
	public void GetDetail3() {
		int raffleId = new Random().nextInt(10000 - 9001) + 9001
		HTTPResponse responseDetail3 = request.GET("http://118.67.143.29/raffles/"+ raffleId)
		grinder.logger.info('GetDetail3')
			if (responseDetail3.statusCode == 301 || responseDetail3.statusCode == 302) {
			  grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail3.statusCode)
			} else {
			  assertThat(responseDetail3.statusCode, is(200))
		}
	}
}
