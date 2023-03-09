

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

    public static GTest test
    public static HTTPRequest request
    public static Map<String, String> headers = [:]
    public static List<Cookie> cookies = []

    @BeforeProcess
    public static void beforeProcess() {
        HTTPRequestControl.setConnectionTimeout(3000000)
        test = new GTest(1, "Test Raffle POST API")
        request = new HTTPRequest()
        grinder.logger.info("before process.")
    }

    @BeforeThread
    public void beforeThread() {
        test.record(this, "test")
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
public void test() {
    int user = new Random().nextInt(200000 - 1) + 1
    int raffleId = new Random().nextInt(10000 - 9001) + 9001
	int sleeptime = new Random().nextInt(2000 - 1)
	int login_interval = new Random().nextInt(2000-1)
    Map<String, Object> request_data = ["userId": "user"+user, "password": "user"+user]
	Thread.sleep(login_interval)
    HTTPResponse response = request.POST("http://slb-16385754.ncloudslb.com/users/login", request_data)
    if (response.statusCode == 301 || response.statusCode == 302) {
        grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", response.statusCode)
    } else {
        assertThat(response.statusCode, is(201))
    }
		
    JSONObject bodyObject = new JSONObject(response.getBodyText())
    int usersId = bodyObject.getInt("usersId");

    HTTPResponse responseMain = request.GET("http://slb-16385754.ncloudslb.com/raffles/rediscloud")
    if (responseMain.statusCode == 301 || responseMain.statusCode == 302) {
        grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain.statusCode)
    } else {
        assertThat(responseMain.statusCode, is(200))
    }
		
    Thread.sleep(sleeptime)
		
		

    HTTPResponse responseDetail = request.GET("http://slb-16385754.ncloudslb.com/raffles/"+ raffleId)
    if (responseDetail.statusCode == 301 || responseDetail.statusCode == 302) {
        grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail.statusCode)
    } else {
        assertThat(responseDetail.statusCode, is(200))
    }
		
		
    Thread.sleep(sleeptime)
		
    
    int i
    int amount = (new Random().nextInt(901)+100)*1000
    Map<String, Object> request_raffle = ["amount": amount, "raffleId" : raffleId, "user" : usersId]
    for (i = 0; i < 5; i++) {
        HTTPResponse requestBid = request.POST("http://slb-16385754.ncloudslb.com/raffles/bid", request_raffle)
        if (requestBid.statusCode == 301 || requestBid.statusCode == 302) {
           requestBid.logger.warn("Warning. The response may not be correct. The response code was {}.", requestBid.statusCode)
        } else {
            assertThat(requestBid.statusCode, is(201))
        }
    }
		
    
    HTTPResponse responseMain2 = request.GET("http://slb-16385754.ncloudslb.com/raffles/rediscloud")
		if (responseMain2.statusCode == 301 || responseMain2.statusCode == 302) {
		  	grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain2.statusCode)
		} else {
			  assertThat(responseMain2.statusCode, is(200))
		}
		
    
    Thread.sleep(sleeptime)
		
		
    HTTPResponse responseDetail2 = request.GET("http://slb-16385754.ncloudslb.com/raffles/"+ raffleId)
		if (responseDetail2.statusCode == 301 || responseDetail2.statusCode == 302) {
            grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail2.statusCode)
    } else {
        assertThat(responseDetail2.statusCode, is(200))
    }
		
		
    Thread.sleep(sleeptime)
		
		
    HTTPResponse responseMain3 = request.GET("http://slb-16385754.ncloudslb.com/raffles/rediscloud")
		if (responseMain3.statusCode == 301 || responseMain3.statusCode == 302) {
			  grinder.looger.warn("Warning. The response may not be correct. The response code was {}.", responseMain3.statusCode)
		} else {
			  assertThat(responseMain3.statusCode, is(200))
		}
		
    
    Thread.sleep(sleeptime)
		
		
    HTTPResponse responseDetail3 = request.GET("http://slb-16385754.ncloudslb.com/raffles/"+ raffleId)
		if (responseDetail3.statusCode == 301 || responseDetail3.statusCode == 302) {
          grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", responseDetail3.statusCode)
    } else {
          assertThat(responseDetail3.statusCode, is(200))
    }
		
  }
}
