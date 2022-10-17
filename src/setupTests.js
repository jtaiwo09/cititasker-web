// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
//
// let handler;
//
// function payNowWithPaystack(url, data, success, error) {
//     handler = PaystackPop.setup({
//         key: 'pk_test_bf7f7fd26a659d22a09510c20e98d7bc55151855',
//         email: data.email,
//         amount: data.lpTOtalprice * 100,
//         ref: '' + Math.floor((Math.random() * 1000000000) + 1),
//         metadata: {
//             custom_fields: [
//                 {
//                     display_name: "Listing ID",
//                     variable_name: "listing_id",
//                     value: data.listing_id
//                 }
//             ]
//         },
//         callback: function (response) {
//             alert('success. transaction ref is ' + response.reference);
//             jQuery.ajax({
//                 type: "POST", dataType: "json",
//                 url, data, success, error,
//             });
//         },
//         onClose: function () {
//            error()
//         }
//     });
//     handler.openIframe();
// }
//
// window.addEventListener("popstate", function () {
//         handler.closeIframe();
//     }
// );
