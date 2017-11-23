/**
 * Created by Administrator on 2017/11/23 0023.
 */
/*!
 * vue-datepicker v0.1.2
 * https://github.com/weifeiyue/vue-datepicker
 * (c) 2016 weifeiyue
 * Released under the MIT License.
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['vue'], factory);
    } else if (typeof exports === 'object') {
        factory(require('vue'));
    } else {
        factory(Vue);
    }
}(function(Vue) {
    Vue.component('time-picker', {
        template: '<span class="time-picker" >'+
        '                <input class="display-time" type="text" readonly="readonly" :value="timer" @click="showPanel" @mousedown="$event.preventDefault()">'+
        '                <span class="clear-btn" style="display: none;">×</span>'+
        '                <div class="dropdown" tabindex="-1"  v-if="show" @blur="showHHMMpanel"  v-el:popup>'+
        '                    <div class="select-list">'+
        '                        <ul class="hours">'+
        '                            <li class="hint">HH</li>'+
        '                            <template v-for="no in HH">' +
        '                               <li @click="selectHH(no)" v-bind:class="{active: no == hCurNum}">{{no<10?\'0\'+no:no}}</li>'+
        '                            </template>' +
        '                        </ul>'+
        '                        <ul class="minutes">'+
        '                            <li class="hint">mm</li>'+
        '                            <template v-for="no in MM">' +
        '                               <li @click="selectMM(no)" v-bind:class="{active: no == mCurNum}">{{no<10?\'0\'+no:no}}</li>'+
        '                            </template>' +
        '                        </ul>'+
        '                    </div>'+
        '                </div>'+
        '            </span>',
        props: {
            //显示格式
            time: {
                type: String
            },
        },
        data: function() {
            return {
                HH: 24,
                MM: 60,
                hCurNum: '',
                mCurNum: '',
                show: false
            };
        },
        computed: {
            timer: function () {
                var str = this.time;
                var arr = str.split(':');

                this.hCurNum = arr[0];
                this.mCurNum = arr[1];

                return str
            }
        },
        watch: {
            show: function (value) {
                if (value) {
                    this.$els.popup.focus()
                };
            },
        },
        methods: {
            showHHMMpanel: function () {
                this.show = false;
            },
            showPanel: function () {
                this.show = !this.show;
            },
            selectHH: function (num) {
                var _self = this;

                _self.hCurNum = num;
               _self.resetTimer();
            },
            selectMM: function (num) {
                var _self = this;

                _self.mCurNum = num;
                _self.resetTimer();
            },
            resetTimer: function () {
                var _self = this;
                var hh = _self.addZero(_self.hCurNum);
                var mm = _self.addZero(_self.mCurNum);

                _self.time = hh + ':' + mm;
            },
            addZero: function (num) {
                return num < 10 ? '0' + Number(num) : Number(num);
            },
        }
    });

   // timePicker.showHHMMpanel();
}));