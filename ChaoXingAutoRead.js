// ==UserScript==
// @name         超星学习通/超星尔雅/泛雅超星自动阅读脚本2025
// @namespace    https://mooc1.chaoxing.com/
// @version      2025-01-03
// @description  自动滚动并翻页，自动识别下一页按钮，让系统认为你一直在阅读界面，适用于https://mooc1.chaoxing.com/course
// @author       cpkkcb
// @match        https://mooc1.chaoxing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 生成随机的滚动速度（10000 毫秒到 20000 毫秒）
    const getRandomScrollSpeed = () => {
        return Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
    };

    // 生成随机的翻页延时时间（10 秒到 15 秒）
    const getRandomClickDelay = () => {
        return Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000;
    };

    // 检查是否滚动到底部
    const isScrollAtBottom = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        // 允许一定的误差（例如 10 像素）
        return scrollY + viewportHeight >= totalHeight - 10;
    };

    // 检查是否存在“下一页”链接
    const isNextPageLinkVisible = () => {
        const nextPageLink = document.querySelector('a.nodeItem.r');
        return nextPageLink && isElementInViewport(nextPageLink);
    };

    // 检查元素是否在视口中
    const isElementInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // 自动滚动和翻页逻辑
    const scrollAndNextPage = () => {
        if (isNextPageLinkVisible()) {
            // 如果“下一页”链接在视口中，随机等待 10 到 15 秒后点击
            const delay = getRandomClickDelay();
            console.log(`“下一页”链接已出现在视口中，等待 ${delay / 1000} 秒后点击...`);
            setTimeout(() => {
                const nextPageLink = document.querySelector('a.nodeItem.r');
                if (nextPageLink) {
                    console.log('点击“下一页”链接');
                    nextPageLink.click();
                }
                // 点击后等待随机时间，重新开始滚动
                setTimeout(scrollAndNextPage, getRandomScrollSpeed());
            }, delay); // 随机延时 10 到 15 秒
        } else if (!isScrollAtBottom()) {
            // 如果没有滚动到底部，继续滚动
            window.scrollBy(0, window.innerHeight / 2); // 每次滚动半个视口高度
            setTimeout(scrollAndNextPage, getRandomScrollSpeed());
        } else {
            // 如果滚动到底部且没有找到“下一页”链接，停止脚本
            console.log('已滚动到底部，未找到“下一页”链接');
        }
    };

    // 启动脚本
    scrollAndNextPage();
})();
