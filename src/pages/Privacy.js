import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Layout>
        <div id="legal-holder">
          <div class="policy">
            <div class="policy-screen">
              <div class="policy-content">
                <h1>Privacy policy</h1>
                <p>
                  CitiTasker manages the information that we collect from you in
                  accordance with applicable privacy legislation. In this
                  Policy, "CitiTasker", "we", "our" and/or "us" means CitiTasker
                  Tchnologies Limited.
                </p>
                <p>
                  This Privacy Policy describes how CitiTasker collects, uses,
                  shares and handles your personal data, and sets out the rights
                  and obligations that both you and CitiTasker have in relation
                  to your personal data. Country specific terms in Appendix A
                  shall also apply to this Privacy Policy.
                </p>
                <p>
                  By accessing www.cititasker.com (the "Services") you accept
                  and agree to the Terms and Conditions of CitiTasker's user
                  agreement ("User Agreement"), and acknowledge that your
                  personal data may be collected, used and disclosed in
                  accordance with this Privacy Policy. Except for any terms that
                  are defined in this Privacy Policy then all other defined
                  terms shall have the same meaning as that defined in the User
                  Agreement. Note that under CitiTasker's Terms and Conditions,
                  you must not use the Services if you are under 18 years old.
                </p>
                <p>
                  CitiTasker may, from time to time, modify this Privacy Policy
                  (and update the web page on which it is displayed). If we
                  materially change the ways in which CitiTasker uses or shares
                  your personal data previously collected from you through the
                  Services, CitiTasker will notify you through your CitiTasker
                  account, your registered email address or other communication.
                  You should check that account regularly.
                </p>
                {/* <ul>
                  <li>
                    <p>
                      (i) where you reside in any country in the European
                      Economic Area, <strong>Cititasker</strong>{" "}
                      <strong>UK Limited</strong> and
                    </p>
                  </li>
                  <li>
                    <p>
                      (ii) where you reside anywhere outside the European
                      Economic Area: <strong>Cititasker Pty Limited,</strong> an
                      Australian company. Company details for each of the
                      Cititasker companies is set out in the Contact Us section
                      below.
                    </p>
                  </li>
                </ul> */}
                {/* <p>
                  This Privacy Policy describes how Cititasker handles your
                  personal data, and sets out the rights and obligations that
                  both you and Cititasker have in relation to your personal
                  data. Country specific terms in Appendix A shall also apply to
                  this Privacy Policy.
                </p>
                <p>
                  By accessing{" "}
                  <a href="www.airtasker.com">www.cititasker.com</a> or our
                  mobile application (together, the "Services") you accept and
                  agree to the terms and conditions of Cititasker's user
                  agreement ("User Agreement"), and acknowledge that your
                  personal data may be collected, used and disclosed in
                  accordance with this Privacy Policy. Except for any terms that
                  are defined in this Privacy Policy then all other defined
                  terms shall have the same meaning as that defined in the User
                  Agreement. Note that under Cititasker's terms and conditions
                  of use, you must not use the Services if you are under 18
                  years old.
                </p>
                <p>
                  Cititasker may, from time to time, modify this Privacy Policy
                  (and update the web page on which it is displayed). Cititasker
                  will send notification of any material modification to your
                  Cititasker account and/or your registered email address. You
                  should check that account regularly.
                </p> */}
                <h3>
                  1. Collection of Your Personal Data Information we collect
                  directly from you
                </h3>
                <p>
                  CitiTasker collects personal data when you pre-register with
                  CitiTasker. This includes your full name, email address and
                  location. In circumstances where the below information is not
                  provided to us, we may be unable to provide the Services to
                  you and carry out our contractual obligations with you.
                </p>
                <h4>Information we collect directly from you</h4>
                <p>
                  CitiTasker collects personal data when you register with
                  CitiTasker. This includes:
                </p>
                <ul>
                  <li>
                    <p>
                      your name, address, email address, phone number and other
                      contact details;
                    </p>
                  </li>
                  <li>
                    <p>your birth date and gender;</p>
                  </li>
                  <li>
                    <p>
                      your credit card and account details, which are processed
                      by a third-party service provider that handles payments
                      for us;
                    </p>
                  </li>
                  <li>
                    <p>
                      your location and the location where you are interested in
                      performing tasks; and
                    </p>
                  </li>
                  <li>
                    <p>
                      your occupation, work experience, resume, qualifications,
                      education, post tasks, earn money preferences, skillset,
                      interests and other information relevant for your fitness
                      for tasks.
                    </p>
                  </li>
                </ul>
                <p>
                  We also give you the option of providing a photo or video to
                  be associated with your CitiTasker user ID. If your personal
                  details change, it is your responsibility to update your
                  CitiTasker account with those changes, so that we can keep our
                  records complete, accurate and up to date.
                </p>
                <p>
                  To enable us to improve our existing services, to create new
                  service features, and to serve you and others with targeted
                  marketing communications, CitiTasker collects information
                  about the way you use the Services, including the transactions
                  you enter into on the Services, your feedback rating
                  (including any references requested using our 'Reference'
                  feature), the bids you make, the comments you post, and the
                  transactions you enter into with our valued affiliate service
                  providers.
                </p>
                <p>
                  You may apply through our job application submission form
                  provided by a third-party service provider. If you do so, we
                  collect the information you make available to us through your
                  application submission, such as your resume, links to other
                  online profiles, and other information you choose to provide.
                </p>
                <h4>
                  Information we collect automatically when you use the Services
                </h4>
                <p>
                  CitiTasker may also receive and record the following
                  information from your internet browser and computer, including
                  through cookies and similar technologies, when you use the
                  Services:
                </p>
                <ul>
                  <li>
                    <p>
                      Computer and connection information such as statistics on
                      page views, traffic to and from the Services, referral
                      URL, IP address, unique device ID, browsing history and
                      web log information; and
                    </p>
                  </li>
                  <li>
                    <p>
                      Information about your use of the Services, including the
                      date and time you visit the Services, the areas or pages
                      that you visit, the amount of time you spend viewing or
                      using the Services, the number of times you return to the
                      Services, other clickstream or website usage information,
                      and emails that you open, forward or click-through to the
                      Services.
                    </p>
                  </li>
                </ul>
                <p>
                  If you use a location-enabled CitiTasker service, if you allow
                  us, we receive and process information about your precise
                  location (for example, through GPS signals sent by your mobile
                  device). We may also collect the precise location of your
                  device when the app is running in the foreground or background
                  or when the app is closed. We may also use a range of
                  different technologies to confirm your location. When you use
                  the Services, we also infer the general location of your
                  device and the geographic regions our users come from. For
                  example, your IP address may indicate your general geographic
                  region.
                </p>
                <p>
                  For more information on how we use cookies and other similar
                  tracking technologies, please see the section on Cookies and
                  Similar Technologies below.
                </p>
                <h4>Information we obtain from other sources</h4>
                <p>
                  In addition to data collected from your submissions, we also
                  receive data from certain third parties, such as social media
                  sites that you connect to your account (including Facebook,
                  LinkedIn, Twitter and any other site you which you enable from
                  time to time) as well as from identity verification service
                  providers and other CitiTasker group companies.
                </p>
                <p>
                  We work with third party verification providers to perform
                  police history checks or background checks on taskers, and
                  receive publicly available information such as court
                  decisions.
                </p>
                <p>
                  We may also receive additional information about you from
                  third parties such as data or marketing partners and combine
                  it with other information we have about you.
                </p>
                <h4>What other information users can see about you</h4>
                <p>
                  You are not anonymous to us when you log into the Services or
                  post any content (including tasks, items to be supplied, bids,
                  comments or feedback) on the Services or any associated forum.
                </p>
                <p>When you:</p>
                <ul>
                  <li>
                    <p>
                      use the Services to post a task or item to be supplied, or
                      make a bid, or comment on a bid, or provide feedback on
                      other users; or
                    </p>
                  </li>
                  <li>
                    <p>
                      otherwise communicate in a public forum on the Services,
                    </p>
                  </li>
                </ul>
                <p>
                  your user ID and all the material that you post is visible and
                  searchable to us, other CitiTasker users and is also publicly
                  available to other internet users. We strongly encourage you
                  to use caution and discretion when posting and carefully
                  consider whether and what to post or how you identify yourself
                  on the Services.
                </p>
                <p>
                  CitiTasker does not in any way control, and does not accept
                  any responsibility or liability whatsoever for, the disclosure
                  or use of personal data which is voluntarily posted by you in
                  a publicly accessible area of the Services.
                </p>
                <h3>2. How We Use Your Personal Data</h3>
                <p>
                  Cititasker may use the information we collect for the
                  following purposes:
                </p>
                <h5>Identification and authentication</h5>
                <p>
                  Legal ground(s) for use: We need to perform this function in
                  order to allow you to access the services.
                </p>
                <h5>To protect Cititasker and the users of the Services</h5>
                <p>
                  Legal ground(s) for use: It is in our (and users) legitimate
                  interests to ensure that our Services is secure.
                </p>
                <h5>
                  To customise the content and any advertising displayed on the
                  Services and permit content on the Services (such as postings
                  or third party advertisements) to be targeted, on an aggregate
                  basis, to the users for whom it is most likely to be relevant
                </h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interest to
                  provide you with content and advertisements that are tailored
                  to your interests.
                </p>
                <h5>
                  To improve our services and develop new service features
                </h5>
                <p>
                  Legal ground(s) for use: We need some of your personal data in
                  order to provide the services to you; it is in our legitimate
                  interests to provide you the best possible services.
                </p>
                <h5>
                  To provide, maintain and protect our Services and to verify
                  the identity of authorised users of the Services.
                </h5>
                <p>
                  Legal ground(s) for use: We need to perform this function in
                  order to provide a safe and secure environment for our users
                  and we have legitimate interests in protecting the integrity
                  of the Services we offer.
                </p>
                <h5>
                  Providing your information to a user with whom you have or had
                  a contract facilitated by Cititasker
                </h5>
                <p>
                  Legal ground(s) for use: We need to use your personal data in
                  this way to provide the services you request.
                </p>
                <h5>
                  As required by law, order of a court, tribunal or regulator or
                  if Cititasker reasonably believes that the use or disclosure
                  of the information is reasonably necessary for enforcement
                  related activities
                </h5>
                <p>
                  Legal ground(s) for use: On such occasions, we are required by
                  law to process your personal data.
                </p>
                <h5>
                  To ensure that Cititasker receives payment of the fees due to
                  it
                </h5>
                <p>
                  Legal ground(s) for use: We need to use your personal data in
                  this way to fulfil a contract between you and us.
                </p>
                <h5>
                  To contact you to inform you about promotions or upcoming
                  changes or improvements to our services
                </h5>
                <p>
                  Legal ground(s) for use: We only contact you for marketing
                  purposes with your consent; we may contact you regarding
                  changes in our services because it is in our legitimate
                  interests to keep you informed about service changes that may
                  affect you. See section below for further detail about
                  marketing.
                </p>
                <h5>To contact you to administer our User Agreement:</h5>
                <p>
                  Legal ground(s) for use: for example, we may notify you of a
                  breach, or action a request for a take down notice in response
                  to a claim of copyright infringement.**
                </p>
                <h5>To conduct research</h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interests to
                  improve the platform through user questionnaires and feedback
                  requests via the platform.
                </p>
                <h5>To expand our user base</h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interest to
                  inform potential users about the Services we offer.
                </p>
                <h5>
                  To develop our relationships with affiliate service providers
                  and provide or arrange internal or external verification
                  services obtained by you via the Services
                </h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interests to
                  engage service providers and verification services.
                </p>
                <h5>
                  To generate data reports on an aggregated, non-personally
                  identifiable basis, for both internal and third party use, but
                  subject to any applicable laws (for example, we may show
                  advertisers or investors trends relating to the general use of
                  Cititasker's services); and
                </h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interests
                  (and the interests of our partners and affiliates) to
                  understand how you and other users engage with our services.
                </p>
                <h5>
                  Your contact information may also be used for accounting,
                  invoicing and billing purposes, marketing purposes, by third
                  party service providers to Cititasker, and to respond to any
                  enquiry you make
                </h5>
                <p>
                  Legal ground(s) for use: It is in our legitimate interests to
                  engage service providers to assist us in delivering the
                  services you request.
                </p>
                <h5>
                  When you contact Cititasker, we may keep a record of the
                  communication(s) between you and Cititasker to help resolve
                  any issues you might have.
                </h5>
                <p>
                  Legal ground(s) for use: We retain information when we are
                  required to do so by law and because it is in our legitimate
                  interests to protect our legal rights.
                </p>
                <h5>
                  If other user(s) of the Services already have your userID (or
                  other information identifying you), and you have chosen to
                  upload a photo or other personal information to your
                  Cititasker account, we may show those user(s) that personal
                  information; and
                </h5>
                <p>
                  Legal ground(s) for use: We display your photo to other users
                  who have your userID only with your consent, which you supply
                  by uploading your photo.
                </p>
                <p>
                  Our Services allow you to review your experience dealing with
                  others on the Services, who may in turn leave reviews about
                  you. We compile these reviews to provide an aggregate rating
                  for each user, which will publicly appear along with your
                  profile. Please be aware that others users may rely on this
                  rating when deciding whether to engage with you.
                </p>
                <h3>3. Cookies and Similar Technologies</h3>
                <p>
                  Cititasker uses cookies and similar tracking technologies for
                  a number of purposes including to access your information when
                  you sign in, keep track of your preferences, direct specific
                  content to you, report on Cititasker's user base, and to
                  improve Cititasker's services. We also use cookies or
                  anonymous identifiers when you interact with our affiliate
                  service providers (for example, when you integrate your
                  Cititasker account with your Facebook profile) and as further
                  described below.
                </p>
                <p>
                  We use the following types of cookies and similar
                  technologies:
                </p>
                <h5>Strictly Necessary Cookies</h5>
                <p>
                  We use cookies and similar technologies that are necessary to
                  the operation of our Services. This includes technologies that
                  allow you access to our website, services, mobile app or that
                  are required to identify irregular site behaviour, prevent
                  fraudulent activity and improve security, or that allow you to
                  make use of our functions such as saved search or similar
                  functions;
                </p>
                <p>
                  If you change the settings on your internet browser to block
                  or restrict cookies (including cookies associated with
                  Cititasker's services), or to indicate when a cookie is being
                  set by Cititasker, the Cititasker Services may not work as
                  intended. You should remember that, while you may still be
                  able to use the Services if your cookies are disabled, our
                  services may not function properly on your device and you may
                  not be able to take advantage of certain Cititasker features.
                </p>
                <h5>Functionality Cookies</h5>
                <p>
                  We use cookies and similar technologies that allow us to offer
                  you enhanced functionality when accessing or using our
                  Services. This may include identifying you when you sign into
                  our website, keeping you signed in as you browse or keeping
                  track of your specified preferences, interests, or past items
                  viewed so that we may enhance the presentation of content on
                  our website and mobile app.
                </p>
                <h5>Performance Analytics Cookies</h5>
                <p>
                  We use cookies and similar technologies to assess the
                  performance of our Services. We use this information to
                  analyse and help us understand how you and other visitors use
                  our Services so we can improve the content or layout of our
                  Services. We also use this information to track the number of
                  our visitors and analyse the popularity of the features we
                  offer.
                </p>
                <h5>Advertising Cookies</h5>
                <p>
                  We may use first-party or third-party cookies and similar
                  technologies to deliver content, including ads relevant to
                  your interests. This includes using technologies to understand
                  the usefulness to you of the advertisements and content that
                  has been delivered to you, such as whether you have clicked on
                  an advertisement.
                </p>
                <p>
                  You may reject first-party advertising cookies and similar
                  technologies through your browser settings (as described
                  below). To learn more about the use of cookies or other
                  technologies to deliver more relevant advertising and to
                  control or opt out of the collection and use of the data by
                  these third party tools, visit&nbsp;
                  <a href="http://www.aboutads.info/choices/">here</a>.
                </p>
                <h4>Browser and System Controls</h4>
                <p>
                  You may set your browser or operating system to limit certain
                  tracking or to decline cookies, but you may not be able to use
                  certain features on the Services which require such cookies.
                  Each browser and operating system is a little different, so
                  please check your browser or operating system's settings or
                  help section to learn more about how to delete or disable
                  cookies and tracking.
                </p>
                <p>
                  If you wish to prevent your data from being used by Google
                  Analytics, Google has developed the Google Analytics opt-out
                  browser add-on available&nbsp;
                  <a href="https://tools.google.com/dlpage/gaoptout/">here</a>,
                  and you can manage your Google accounts&nbsp;
                  <a href="https://adssettings.google.com/u/0/authenticated">
                    here
                  </a>
                  .
                </p>
                <h3>4. How We Share Your Personal Data</h3>
                <p>
                  Cititasker may disclose the information We collect from you as
                  follows:
                </p>
                <ul>
                  <li>
                    <p>
                      Cititasker Affiliates.&nbsp;We may share your personal
                      data with our affiliated companies.
                    </p>
                  </li>
                  <li>
                    <p>
                      Service Providers.&nbsp;We share your personal data with
                      third party service providers that provide business,
                      verification, professional or technical support functions
                      for us, help us operate our business and the services, or
                      administer activities on our behalf.
                    </p>
                  </li>
                  <li>
                    <p>
                      Analytics Partners. We use analytics services such as
                      Google Analytics to collect and process certain analytics
                      data. These services may also collect information about
                      your use of other websites, apps, and online resources.
                      You can learn about Google’s practices by going to 
                      <a href="https://www.google.com/policies/privacy/partners/">
                        https://www.google.com/policies/privacy/partners/
                      </a>
                      , and opt-out of them by downloading the Google Analytics
                      opt-out browser add-on, available at 
                      <a href="https://tools.google.com/dlpage/gaoptout">
                        https://tools.google.com/dlpage/gaoptout
                      </a>
                      .
                    </p>
                  </li>
                  <li>
                    <p>
                      Advertising Partners. We work with third party advertising
                      partners to show you ads that we think may interest you.
                      Some of our advertising partners are members of the
                      Network Advertising Initiative 
                      <a href="https://optout.networkadvertising.org">
                        https://optout.networkadvertising.org)
                      </a>
                       or the Digital Advertising Alliance 
                      <a href="https://optout.aboutads.info">
                        (https://optout.aboutads.info)
                      </a>
                      . If you do not wish to receive personalized ads, please
                      visit their opt-out pages to learn about how you may opt
                      out of receiving web-based personalized ads from member
                      companies. You can access any settings offered by your
                      mobile operating system to limit ad tracking, or you can
                      install the AppChoices mobile app to learn more about how
                      you may opt out of personalized ads in mobile apps.
                    </p>
                  </li>
                  <li>
                    <p>
                      Other Third Parties.&nbsp;We may share your personal data
                      with other third parties who participate in Cititasker
                      marketing initiatives, as authorised by you, and with
                      consultants, advisors and analytics providers as necessary
                      to measure and improve the services we provide to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      Sharing Between Users. We may share information, such as
                      ratings and reviews about you, with other users who are
                      looking for taskers on the Services.
                    </p>
                  </li>
                  <li>
                    <p>
                      Legal Matters & Safety. We may share your personal data to
                      respond to judicial process or provide information to law
                      enforcement or regulatory agencies or in connection with
                      an investigation on matters related to public safety, as
                      permitted or required by law. We may also share your
                      personal data if we believe there has been a violation of
                      our <Link to="/terms">Terms and Conditions</Link>, our
                      rights, or the rights of any third party.
                    </p>
                  </li>
                  <li>
                    <p>
                      Sale or Transfer of Business or Assets.&nbsp;In the event
                      that we, or any of our businesses, are sold or disposed
                      of, whether by merger, sale of assets or otherwise, or in
                      the event of insolvency, bankruptcy or receivership, your
                      personal data may be one of the assets sold or merged in
                      connection with the transaction.
                    </p>
                  </li>
                  <li>
                    <p>
                      With Your Permission.&nbsp;We may share your personal data
                      with any other third party with your consent or as
                      necessary to deliver a service you requested.
                    </p>
                  </li>
                </ul>
                <h3>5. Security</h3>
                <p>
                  Your account is protected by a password for your privacy and
                  security. We take reasonable steps to protect your personal
                  data from unauthorized access, use and disclosure, however we
                  cannot guarantee the absolute security of that information, or
                  that our systems will be completely free from third party
                  interception or are incorruptible from viruses. We cannot and
                  do not guarantee that information you send from your computer
                  to us over the Internet will be protected by any form of
                  encryption (encoding software). In light of this, we cannot
                  and do not ensure or warrant the security or privacy of your
                  personal data, including payment and account details. You
                  transmit your personal data to us at your own risk. You are
                  entirely responsible for maintaining the security of your
                  passwords and/or account information.
                </p>

                <h3>6. Third Parties</h3>
                <p>
                The Services may contain links to third party websites including the networks of our valued affiliate service providers, advertisers, and PayPal, or make available services obtained from third parties, including verification services by third party verification providers. If you follow a link to any of these websites, for instance PayPal payment system, or use any services obtained from third party service providers via the Services that requires you to provide personal data directly to such third parties (for instance third party verification providers), note that they have their own privacy policies. If you use the Services to link to another site, or use a service obtained from a third party service provider via the Services, you will be subject to that site's or third party's terms and conditions of use, privacy policy and security statement. We strongly encourage you to view these before disclosing any of your personal data on such sites. CitiTasker does not control, and does not accept any responsibility or liability for, the privacy policy of, and use of personal data by, any party other than CitiTasker, including any user of the Services, the operators of any website to which the Services link, or third party service providers to whom you directly provide your personal data (including sensitive information if relevant) to.
                </p>
                <h3>7. Marketing</h3>
                <p>
                When you register on the Services you may be given the opportunity to elect ("opt-in") or decline (“opt-out”) to receive updates on our latest services, news and special offers, and those of our valued affiliate service providers ("Marketing Material"), via your CitiTasker account, personal e-mail address, post or telephone. If you conclude a transaction on the Services, you may also be given the opportunity to opt- in to receive Marketing Material from CitiTasker and our valued affiliate service providers.
                </p>
                <p>
                  Once you opt-in to receive Marketing Material, You may, at any
                  time, opt-out of receiving Marketing Material. To opt-out go
                  to the 'Manage Account' link on the Services, choose
                  'Settings', then 'Alerts' and update your preferences. You can
                  also click on the "unsubscribe" link in any email containing
                  Marketing Material that we send you, or you can request an
                  opt-out by emailing Cititasker using the contact information
                  provided on the Services. If you no longer consent to
                  receiving Marketing Material then you must opt-out in one of
                  these ways.
                </p>
                <p>
                  Cititasker may contact you as the result of a referral by
                  another user of the Services who has provided us with contact
                  information, such as your name and email address. The use of
                  contact information received in connection with a referral
                  will be governed by this Privacy Policy. You may, at any time,
                  opt-out of Cititasker's referral system by emailing Cititasker
                  using the contact information provided on the Services.
                </p>
                <p>
                CitiTasker reserves the right to send you administrative and account-related messages even if you opt out of receiving Marketing Material.
                </p>
                
                <h3>8. Your Rights and Choices</h3>
                <p>
                  We will allow you, at any time, to access, edit, update,
                  restrict processing and/ or delete the personal data that we
                  hold about you or to receive a copy of it in a portable format
                  by contacting us&nbsp;
                  <a href="https://support.airtasker.com/hc/en-us">here</a>.
                  Where we process your personal data with your consent, you may
                  withdraw it at any time. You also have a right to object to
                  processing based on legitimate interests or These rights may
                  be limited in some circumstances, for example, if:
                </p>
                <ul>
                  <li>
                    <p>
                      We are legally permitted or required to deny you access
                      to, and/ or to retain, the information because we are
                      subject to a legal requirement or have a compelling
                      legitimate interest; or
                    </p>
                  </li>
                  <li>
                    <p>
                      You make a request that is unreasonably repetitive,
                      requires Cititasker to make a disproportionate effort,
                      risks the privacy of others, or there are other valid
                      reasons why we cannot comply.
                    </p>
                  </li>
                </ul>
                <p>
                  We need to prevent information in our systems from being
                  accidentally or maliciously destroyed. This means that, where
                  you delete information from our services, residual copies of
                  that information on our active servers, as well as any
                  corresponding information on our back-up systems, may not be
                  immediately deleted.
                </p>
                <p>
                  If you have concerns about how we handle your personal
                  information or require further information, please email
                  Cititasker using the contact form provided on the Services. If
                  you have unresolved complaints, you have the right to complain
                  to a data protection authority.
                </p>
                <h4>9. Retention</h4>
                <p>
                  We retain your personal data for as long as is necessary with
                  regard to the purposes for which it was collected or lawfully
                  further processed, or for as long as may be necessary in light
                  of our legal obligations or in order to allow us to pursue,
                  defend or exercise legal claims.
                </p>
                <h3>10. Children's Privacy</h3>
                <p>We do not knowingly collect, maintain, or use personal data from children under 18 years of age, and no part of the Services are directed to children. If you learn that a child has provided us with personal data in violation of this Privacy Policy, please alert us using our contact information below.</p>

                <h3>11. Contact us</h3>
                <p>If you have any questions about this Privacy Policy or about the manner in which we process your personal data, please contact us at <a href="mailto:support@cititasker.com">support@cititasker.com</a> or CitiTasker Technologies Limited, 4, Olufemi Close, Idimu, Lagos, Nigeria.</p>
                {/* <h1>APPENDIX A:</h1>
                <h2>COUNTRY SPECIFIC TERMS</h2>
                <h3>1. Australian Privacy Terms</h3>
                <p>
                  If You are a User who has Your Cititasker Platform account in
                  (or the Services are performed in) Australia then the
                  following terms will also apply to or may vary this Privacy
                  Policy, to the extent specified:
                </p>
                <p>
                  a. a reference to 'personal data' shall also mean 'personal
                  information' as defined in the Privacy Act 1988 (Cth);
                </p>
                <p>
                  b. a reference to 'sensitive information' has the same meaning
                  given to it in the Privacy Act 1988 (Cth); and
                </p>
                <p>
                  c. if we collect, use or disclose any information from you in
                  accordance with this Privacy Policy that is also sensitive
                  information (such as information relating to police checks
                  conducted on users), then we will seek consent directly from
                  you each time we collect, use or disclose your sensitive
                  information, including for direct marketing purposes. We will
                  not use or disclose your sensitive information for any other
                  purpose unless the purpose is directly related to the primary
                  purpose for which your sensitive information was collected.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
