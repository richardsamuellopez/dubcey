// From http://www.nitrografixx.com/MFL-Scoreboard/scoreboard.js
var scoreboardVersion = "09-26-2017";
if (void 0 === scoreboardTestMode) var scoreboardTestMode = !1;
if (void 0 === importScoreboardSkin) var importScoreboardSkin = !0;
if (void 0 === scoreboardName) var scoreboardName = "";
if (void 0 === includeProjections) var includeProjections = !0;
if (void 0 === includeSOS) var includeSOS = !0;
if (void 0 === includeStarterTotals) var includeStarterTotals = !0;
if (void 0 === includeBenchTotals) var includeBenchTotals = !0;
if (void 0 === alwaysDisplayBenchPlayers) var alwaysDisplayBenchPlayers = !1;
if (void 0 === allPlaySetup) var allPlaySetup = !1;
if (void 0 === useNFLIconInPlayerTable) var useNFLIconInPlayerTable = !0;
if (void 0 === useMFLIconInPlayerTable) var useMFLIconInPlayerTable = !1;
if (void 0 === includeLoadingScreen) var includeLoadingScreen = !0;
if (void 0 === includeCustomPlayers) var includeCustomPlayers = !1;
if (void 0 === scoreboardUseIcon) var scoreboardUseIcon = !1;
if (void 0 === scoreboardUseLogo) var scoreboardUseLogo = !0;
if (void 0 === scoreboardUseAbbrev) var scoreboardUseAbbrev = !1;
if (void 0 === scoreboardIconBase) var scoreboardIconBase = "";
if (void 0 === scoreboardIconExt) var scoreboardIconExt = "";
if (void 0 === scoreboardRoadImageFlip) var scoreboardRoadImageFlip = !1;
if (void 0 === scoreboardHomeImageFlip) var scoreboardHomeImageFlip = !1;
if (void 0 === miniScoreboardUseIcon) var miniScoreboardUseIcon = !1;
if (void 0 === miniScoreboardUseLogo) var miniScoreboardUseLogo = !1;
if (void 0 === miniScoreboardUseAbbrev) var miniScoreboardUseAbbrev = !1;
if (void 0 === miniScoreboardIconBase) var miniScoreboardIconBase = "";
if (void 0 === miniScoreboardIconExt) var miniScoreboardIconExt = "";
if (void 0 === redZoneImage) var redZoneImage = "//www.nitrografixx.com/MFL-Scoreboard/red_zone.png";
if (void 0 === hasBallImage) var hasBallImage = "//www.nitrografixx.com/MFL-Scoreboard/has_ball.png";
if (void 0 === newScoreImage) var newScoreImage = "//www.nitrografixx.com/MFL-Scoreboard/new_score.png";
if (void 0 === recentUpdateImage) var recentUpdateImage = "//www.nitrografixx.com/MFL-Scoreboard/new_stats.png";
if (void 0 === recentNegativeUpdateImage) var recentNegativeUpdateImage = "//www.nitrografixx.com/MFL-Scoreboard/new_stats_down.png";
if (void 0 === nflLogoPath) var nflLogoPath = "//www.nitrografixx.com/MFL-Popups/NFL-custom-logos/";
if (void 0 === nflLogoExt) var nflLogoExt = "png";
if (void 0 === scoreboardStylesheetPath) var scoreboardStylesheetPath = "//www.nitrografixx.com/MFL-Scoreboard/skin/";
if (
    (jQuery(function () {
        alwaysDisplayBenchPlayers &&
            jQuery("head").append(
                '<style>#outerMFLScoreboardDiv tr[class*="showBench"]{display:table-row!important}#outerMFLScoreboardDiv th.pointTotalTitle span,#outerMFLScoreboardDiv .lineupHeaderPlayer span{display:none}#outerMFLScoreboardDiv .pointTotalTitle span[class*="showBench"]{display:inline!important}</style>'
            );
    }),
    void 0 === maxLoops)
)
    var maxLoops = 180;
if (void 0 === refreshSeconds) var refreshSeconds = 41;
if (void 0 === matchupsPerRow) var matchupsPerRow = 500;
if (void 0 === MFLNFLLineupIncludeFA) var MFLNFLLineupIncludeFA = !0;
if (void 0 === MFLNFLLineupIncludeNotUsedPositions) var MFLNFLLineupIncludeNotUsedPositions = !1;
function bindTooltip() {
    var e = $("[rel~=scoreboardTooltip]"),
        a = !1,
        t = !1,
        r = !1;
    e.bind("mouseenter", function () {
        if (((a = $(this)), (targetId = a.attr("id")), (r = a.attr("hint")), (t = $('<div id="scoreboardTooltip"></div>')), !r || "" === r)) return !1;
        if ("setup" === r.substring(0, 5)) {
            var e = r
                .substring(6, r.length - 1)
                .replace(/\"/g, "")
                .split(",");
            setuphint(e[0], e[1], e[2], targetId);
        } else t.css("opacity", 0).html(r).appendTo("body");
        var o = function () {
            $(window).width() < 1.5 * t.outerWidth() ? t.css("max-width", $(window).width() / 2) : t.css("max-width", 340);
            var e = a.offset().left + a.outerWidth() / 2 - t.outerWidth() / 2,
                r = a.offset().top - t.outerHeight() - 20;
            if (
                (e < 0 ? ((e = a.offset().left + a.outerWidth() / 2 - 20), t.addClass("left")) : t.removeClass("left"),
                e + t.outerWidth() > $(window).width() ? ((e = a.offset().left - t.outerWidth() + a.outerWidth() / 2 + 20), t.addClass("right")) : t.removeClass("right"),
                r < 0)
            ) {
                r = a.offset().top + a.outerHeight();
                t.addClass("top");
            } else t.removeClass("top");
            t.css({ left: e, top: r }).animate({ top: "+=10", opacity: 1 }, 50);
        };
        o(), $(window).resize(o);
        var n = function () {
            t.animate({ top: "-=10", opacity: 0 }, 50, function () {
                $(this).remove();
            });
        };
        a.bind("mouseleave", n), t.bind("click", n);
    });
}
function setuphint(e, a, t, r) {
    var o = baseURLDynamic + "/" + year + "/live_scoring?L=" + league_id + "&W=" + t + "&FRANCHISES=" + a,
        n = "";
    $.ajax({ type: "GET", url: o, async: !1, data: { USER_ID: userCookieValue } }).done(function (a) {
        for (
            var t = $(a)
                    .find(".report")
                    .filter(function (e) {
                        if (0 === e) return !0;
                    }),
                o = $(a)
                    .find(".report")
                    .filter(function (e) {
                        if (1 === e) return !0;
                    }),
                s = 0;
            s < $(t).find("tr").length;
            s++
        )
            $(t)
                .find("tr:eq(" + s + ') a[class^="position_"]')
                .each(function () {
                    var a = $(this).attr("href");
                    if (a.substring(a.indexOf("P=") + 2, a.length) === e) {
                        var r = $(t).html(),
                            o = $(t)
                                .find("tr:eq(" + s + ")")
                                .html();
                        n = (n = r.substring(r.indexOf(o), r.length)).substring(0, n.indexOf("<b>Subtotal</b></td></tr>") + 20);
                    }
                });
        for (s = 0; s < $(o).find("tr").length; s++)
            $(o)
                .find("tr:eq(" + s + ') a[class^="position_"]')
                .each(function () {
                    var a = $(this).attr("href");
                    if (a.substring(a.indexOf("P=") + 2, a.length) === e) {
                        var t = $(o).html(),
                            r = $(o)
                                .find("tr:eq(" + s + ")")
                                .html();
                        n = (n = t.substring(t.indexOf(r), t.length)).substring(0, n.indexOf("<b>Subtotal</b></td></tr>") + 20);
                    }
                });
        n =
            '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Points Breakdown</span></caption><tbody><tr class="oddtablerow">' +
            (n = (n = (n = (n = n.replace(/eventablerow/g, "oddtablerow")).replace('class="', 'class="MFLPlayerName ')).replace(/<a /g, "<c ")).replace(/<\/a>/g, "</c>")) +
            "</tr></tbody></table>";
        var i = $('<div id="scoreboardTooltip"></div>');
        i.css("opacity", 0).html(n).appendTo("body"), $(window).width() < 1.5 * i.outerWidth() ? i.css("max-width", $(window).width() / 2) : i.css("max-width", 340);
        var l = $("#" + r).offset().left + $("#" + r).outerWidth() / 2 - i.outerWidth() / 2,
            c = $("#" + r).offset().top - i.outerHeight() - 20;
        if (
            (l < 0 ? ((l = $("#" + r).offset().left + $("#" + r).outerWidth() / 2 - 20), i.addClass("left")) : i.removeClass("left"),
            l + i.outerWidth() > $(window).width() ? ((l = $("#" + r).offset().left - i.outerWidth() + $("#" + r).outerWidth() / 2 + 20), i.addClass("right")) : i.removeClass("right"),
            c < 0)
        ) {
            c = $("#" + r).offset().top + $("#" + r).outerHeight();
            i.addClass("top");
        } else i.removeClass("top");
        i.css({ left: l, top: c }).animate({ top: "+=10", opacity: 1 }, 50);
        var d = function () {
            i.animate({ top: "-=10", opacity: 0 }, 50, function () {
                $(this).remove();
            });
        };
        $("#" + r).bind("mouseleave", d), i.bind("click", d);
    });
}
function getThisHintTable(e, a, t) {
    var r = baseURLDynamic + "/" + year + "/live_scoring?L=" + league_id + "&W=" + t + "&FRANCHISES=" + a,
        o = "";
    return (
        $.ajax({ type: "GET", url: r, async: !1, data: { USER_ID: userCookieValue } }).done(function (a) {
            for (
                var t = $(a)
                        .find(".report")
                        .filter(function (e) {
                            if (0 === e) return !0;
                        }),
                    r = $(a)
                        .find(".report")
                        .filter(function (e) {
                            if (1 === e) return !0;
                        }),
                    n = 0;
                n < $(t).find("tr").length;
                n++
            )
                $(t)
                    .find("tr:eq(" + n + ') a[class^="position_"]')
                    .each(function () {
                        var a = $(this).attr("href");
                        if (a.substring(a.indexOf("P=") + 2, a.length) === e) {
                            var r = $(t).html(),
                                s = $(t)
                                    .find("tr:eq(" + n + ")")
                                    .html();
                            o = (o = r.substring(r.indexOf(s), r.length)).substring(0, o.indexOf("<b>Subtotal</b></td></tr>") + 20);
                        }
                    });
            for (n = 0; n < $(r).find("tr").length; n++)
                $(r)
                    .find("tr:eq(" + n + ') a[class^="position_"]')
                    .each(function () {
                        var a = $(this).attr("href");
                        if (a.substring(a.indexOf("P=") + 2, a.length) === e) {
                            var t = $(r).html(),
                                s = $(r)
                                    .find("tr:eq(" + n + ")")
                                    .html();
                            o = (o = t.substring(t.indexOf(s), t.length)).substring(0, o.indexOf("<b>Subtotal</b></td></tr>") + 20);
                        }
                    });
        }),
        (o =
            '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Points Breakdown</span></caption><tbody><tr>' +
            (o = (o = (o = (o = (o = o.replace(/oddtablerow/g, "rowYTP")).replace(/eventablerow/g, "rowYTP")).replace('class="', 'class="MFLPlayerName ')).replace(/<a /g, "<c ")).replace(/<\/a>/g, "</c>")) +
            "</tr></tbody></table>")
    );
}
function getMFLLiveScoringData(e) {
    var a = new Array();
    if (((tempAllPlayCheck = void 0 === e.liveScoring.matchup), allPlaySetup || tempAllPlayCheck)) {
        var t = new Array();
        try {
            if (void 0 !== e.liveScoring.matchup.length) for (var r = 0; r < e.liveScoring.matchup.length; r++) (t[t.length] = e.liveScoring.matchup[r].franchise[0]), (t[t.length] = e.liveScoring.matchup[r].franchise[1]);
            else void 0 !== e.liveScoring.matchup && ((t[t.length] = e.liveScoring.matchup.franchise[0]), (t[t.length] = e.liveScoring.matchup.franchise[1]));
        } catch (e) {}
        try {
            if (void 0 !== e.liveScoring.franchise.length) for (r = 0; r < e.liveScoring.franchise.length; r++) t[t.length] = e.liveScoring.franchise[r];
            else void 0 !== e.liveScoring.franchise && (t[t.length] = e.liveScoring.franchise);
        } catch (e) {}
        for (r = 0; r < t.length; r++) {
            if (t[r].id === currentAllPlayTeam)
                "" === (l = { fid: t[r].id, score: t[r].score, gameSecondsRemaining: t[r].gameSecondsRemaining, yetToPlay: t[r].playersYetToPlay, currentlyPlaying: t[r].playersCurrentlyPlaying }).gameSecondsRemaining &&
                    (l.gameSecondsRemaining = "0"),
                    0 === parseInt(l.yetToPlay, 10) && 0 === parseInt(l.currentlyPlaying, 10) && (l.gameSecondsRemaining = "0");
        }
        var o = 0;
        for (r = 0; r < t.length; r++) {
            if (t[r].id !== currentAllPlayTeam)
                "" === (c = { fid: t[r].id, score: t[r].score, gameSecondsRemaining: t[r].gameSecondsRemaining, yetToPlay: t[r].playersYetToPlay, currentlyPlaying: t[r].playersCurrentlyPlaying }).gameSecondsRemaining &&
                    (c.gameSecondsRemaining = "0"),
                    0 === parseInt(c.yetToPlay, 10) && 0 === parseInt(c.currentlyPlaying, 10) && (c.gameSecondsRemaining = "0"),
                    (a[o] = { road: l, home: c, gameSecondsRemaining: parseInt(l.gameSecondsRemaining, 10) + parseInt(c.gameSecondsRemaining, 10) }),
                    o++;
        }
        for (r = 0; r < a.length; r++)
            for (var n = 0; n < a.length - r - 1; n++)
                if (validateAsNumber(a[n].home.score) < validateAsNumber(a[n + 1].home.score)) {
                    var s = a[n];
                    (a[n] = a[n + 1]), (a[n + 1] = s);
                }
    } else {
        var i = new Array();
        if (void 0 !== e.liveScoring.matchup.length) i = e.liveScoring.matchup;
        else void 0 !== e.liveScoring.matchup && (i[0] = e.liveScoring.matchup);
        for (r = 0; r < i.length; r++) {
            var l = {
                    fid: i[r].franchise[0].id,
                    score: i[r].franchise[0].score,
                    gameSecondsRemaining: i[r].franchise[0].gameSecondsRemaining,
                    yetToPlay: i[r].franchise[0].playersYetToPlay,
                    currentlyPlaying: i[r].franchise[0].playersCurrentlyPlaying,
                },
                c = {
                    fid: i[r].franchise[1].id,
                    score: i[r].franchise[1].score,
                    gameSecondsRemaining: i[r].franchise[1].gameSecondsRemaining,
                    yetToPlay: i[r].franchise[1].playersYetToPlay,
                    currentlyPlaying: i[r].franchise[1].playersCurrentlyPlaying,
                };
            l.fid === myUpdateTeam && (myOppUpdateTeam = c.fid),
                c.fid === myUpdateTeam && (myOppUpdateTeam = l.fid),
                "" === l.gameSecondsRemaining && (l.gameSecondsRemaining = "0"),
                "" === c.gameSecondsRemaining && (c.gameSecondsRemaining = "0"),
                0 === parseInt(l.yetToPlay, 10) && 0 === parseInt(l.currentlyPlaying, 10) && (l.gameSecondsRemaining = "0"),
                0 === parseInt(c.yetToPlay, 10) && 0 === parseInt(c.currentlyPlaying, 10) && (c.gameSecondsRemaining = "0"),
                (a[r] = { road: l, home: c, gameSecondsRemaining: parseInt(l.gameSecondsRemaining, 10) + parseInt(c.gameSecondsRemaining, 10) });
        }
    }
    return 0 === a.length && (liveScoringEmpty = !0), a;
}
function getMFLLiveScoringResultsData(e, a) {
    var t = new Array(),
        r = new Array(),
        o = new Array(),
        n = new Array(),
        s = new Array(),
        i = new Array(),
        l = 0;
    for (var c in franchiseDatabase) l >= 1 && l <= leagueAttributes.Franchises && (i[franchiseDatabase[c].id] = 0), l++;
    if (((tempAllPlayCheck = 1 === a ? void 0 === e.liveScoring.matchup : void 0 === e.weeklyResults.matchup), allPlaySetup || tempAllPlayCheck)) {
        var d = new Array(),
            p = new Array();
        p = 1 === a ? e.liveScoring : e.weeklyResults;
        try {
            if (void 0 !== p.matchup.length) for (var h = 0; h < p.matchup.length; h++) (d[d.length] = p.matchup[h].franchise[0]), (d[d.length] = p.matchup[h].franchise[1]);
            else void 0 !== p.matchup && ((d[d.length] = p.matchup.franchise[0]), (d[d.length] = p.matchup.franchise[1]));
        } catch (e) {}
        try {
            if (void 0 !== p.franchise.length) for (h = 0; h < p.franchise.length; h++) d[d.length] = p.franchise[h];
            else void 0 !== p.franchise && (d[d.length] = p.franchise);
        } catch (e) {}
        for (h = 0; h < d.length; h++)
            if (d[h].id === currentAllPlayTeam) {
                if (1 === a) var u = { score: d[h].score, gameSecondsRemaining: d[h].gameSecondsRemaining, playersYetToPlay: d[h].playersYetToPlay, playersCurrentlyPlaying: d[h].playersCurrentlyPlaying };
                else u = { score: d[h].score, gameSecondsRemaining: "0", playersYetToPlay: "0", playersCurrentlyPlaying: "0" };
                if (
                    ("" === u.gameSecondsRemaining && (u.gameSecondsRemaining = "0"),
                    0 === parseInt(u.playersYetToPlay, 10) && 0 === parseInt(u.playersCurrentlyPlaying, 10) && (u.gameSecondsRemaining = "0"),
                    (t[d[h].id] = new Array()),
                    (t[d[h].id] = u),
                    1 === a)
                ) {
                    (n.gameSecondsRemaining = parseInt(validateAsNumber(d[h].gameSecondsRemaining))), (s[d[h].id] = 0);
                    try {
                        for (var m = 0; m < d[h].players.player.length; m++)
                            (r[d[h].players.player[m].id] = validateAsNumber(d[h].players.player[m].score)),
                                "starter" === d[h].players.player[m].status &&
                                    (s[d[h].id] += validateAsNumber(d[h].players.player[m].score) + (validateAsNumber(d[h].players.player[m].gameSecondsRemaining) / 3600) * validateAsNumber(fsProjections[d[h].players.player[m].id]));
                        0 === parseInt(validateAsNumber(d[h].gameSecondsRemaining)) && (s[d[h].id] = "");
                    } catch (e) {
                        MFLNoData = !0;
                    }
                } else {
                    n.gameSecondsRemaining = 0;
                    try {
                        for (m = 0; m < d[h].player.length; m++) r[d[h].player[m].id] = validateAsNumber(d[h].player[m].score);
                    } catch (e) {}
                }
                (n.fid = d[h].id), (n.score = d[h].score);
            }
        for (h = 0; h < d.length; h++)
            if (d[h].id !== currentAllPlayTeam) {
                var f = o.length;
                if (((o[f] = new Array()), 1 === a)) var y = { score: d[h].score, gameSecondsRemaining: d[h].gameSecondsRemaining, playerYetToPlay: d[h].playersYetToPlay, playersCurrentlyPlaying: d[h].playersCurrentlyPlaying };
                else y = { score: d[h].score, gameSecondsRemaining: "0", playersYetToPlay: "0", playersCurrentlyPlaying: "0" };
                if (
                    ("" === y.gameSecondsRemaining && (y.gameSecondsRemaining = "0"),
                    0 === parseInt(y.playersYetToPlay, 10) && 0 === parseInt(y.playersCurrentlyPlaying, 10) && (y.gameSecondsRemaining = "0"),
                    (t[d[h].id] = new Array()),
                    (t[d[h].id] = y),
                    (o[f].gameSecondsRemaining = n[0] + parseInt(validateAsNumber(d[h].gameSecondsRemaining))),
                    i[n.fid]++,
                    i[d[h].id]++,
                    (o[f].gameIdRoad = i[n.fid]),
                    (o[f].gameIdHome = i[d[h].id]),
                    (o[f].fidRoad = n.fid),
                    (o[f].fidHome = d[h].id),
                    (o[f].scoreRoad = n.score),
                    (o[f].scoreHome = d[h].score),
                    (o[f].resultRoad = ""),
                    (o[f].resultHome = ""),
                    (o[f].spreadRoad = ""),
                    (o[f].spreadHome = ""),
                    1 === a)
                ) {
                    s[d[h].id] = 0;
                    try {
                        for (m = 0; m < d[h].players.player.length; m++)
                            (r[d[h].players.player[m].id] = validateAsNumber(d[h].players.player[m].score)),
                                "starter" === d[h].players.player[m].status &&
                                    (s[d[h].id] += validateAsNumber(d[h].players.player[m].score) + (validateAsNumber(d[h].players.player[m].gameSecondsRemaining) / 3600) * validateAsNumber(fsProjections[d[h].players.player[m].id]));
                        0 === parseInt(validateAsNumber(d[h].gameSecondsRemaining)) && (s[d[h].id] = "");
                    } catch (e) {
                        MFLNoData = !0;
                    }
                } else
                    try {
                        for (m = 0; m < d[h].player.length; m++) r[d[h].player[m].id] = validateAsNumber(d[h].player[m].score);
                    } catch (e) {}
            }
        for (h = 0; h < o.length; h++)
            for (m = 0; m < o.length - h - 1; m++)
                if (validateAsNumber(o[m].scoreHome) < validateAsNumber(o[m + 1].scoreHome)) {
                    p = o[m];
                    (o[m] = o[m + 1]), (o[m + 1] = p);
                }
    } else {
        var g = new Array();
        if (1 === a) p = e.liveScoring;
        else p = e.weeklyResults;
        void 0 !== p.matchup.length ? (g = p.matchup) : (g[0] = p.matchup);
        for (h = 0; h < g.length; h++) {
            if (((o[h] = new Array()), 1 === a)) {
                var L = 0,
                    b = 0;
                try {
                    for (m = 0; m < g[h].franchise[0].players.player.length; m++)
                        if ("starter" === g[h].franchise[0].players.player[m].status) {
                            L++;
                            try {
                                void 0 === scoreboardFirstKickoff[g[h].franchise[0].id]
                                    ? parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[0].players.player[m].id].team].kickoff) > 0 &&
                                      (scoreboardFirstKickoff[g[h].franchise[0].id] = parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[0].players.player[m].id].team].kickoff))
                                    : parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[0].players.player[m].id].team].kickoff) > 0 &&
                                      parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[0].players.player[m].id].team].kickoff) < scoreboardFirstKickoff[g[h].franchise[0].id] &&
                                      (scoreboardFirstKickoff[g[h].franchise[0].id] = parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[0].players.player[m].id].team].kickoff));
                            } catch (e) {
                                console.log(h + " error road");
                            }
                        }
                } catch (e) {}
                try {
                    for (m = 0; m < g[h].franchise[1].players.player.length; m++)
                        if ("starter" === g[h].franchise[1].players.player[m].status) {
                            b++;
                            try {
                                void 0 === scoreboardFirstKickoff[g[h].franchise[1].id]
                                    ? parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[1].players.player[m].id].team].kickoff) > 0 &&
                                      (scoreboardFirstKickoff[g[h].franchise[1].id] = parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[1].players.player[m].id].team].kickoff))
                                    : parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[1].players.player[m].id].team].kickoff) > 0 &&
                                      parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[1].players.player[m].id].team].kickoff) < scoreboardFirstKickoff[g[h].franchise[1].id] &&
                                      (scoreboardFirstKickoff[g[h].franchise[1].id] = parseInt(nflSchedule[MFLPlayerInfo[g[h].franchise[1].players.player[m].id].team].kickoff));
                            } catch (e) {
                                console.log(h + " error home");
                            }
                        }
                } catch (e) {}
                "" === g[h].franchise[0].gameSecondsRemaining && (g[h].franchise[0].gameSecondsRemaining = 0), "" === g[h].franchise[1].gameSecondsRemaining && (g[h].franchise[1].gameSecondsRemaining = 0);
                (u = {
                    score: g[h].franchise[0].score,
                    gameSecondsRemaining: parseInt(validateAsNumber(g[h].franchise[0].gameSecondsRemaining)),
                    playersYetToPlay: g[h].franchise[0].playersYetToPlay,
                    playersCurrentlyPlaying: g[h].franchise[0].playersCurrentlyPlaying,
                    starters: L,
                }),
                    (y = {
                        score: g[h].franchise[1].score,
                        gameSecondsRemaining: parseInt(validateAsNumber(g[h].franchise[1].gameSecondsRemaining)),
                        playersYetToPlay: g[h].franchise[1].playersYetToPlay,
                        playersCurrentlyPlaying: g[h].franchise[1].playersCurrentlyPlaying,
                        starters: b,
                    });
                0 === parseFloat(u.score) && 0 === parseFloat(y.score) && ((g[h].franchise[0].gameSecondsRemaining = 3600 * u.starters), (g[h].franchise[1].gameSecondsRemaining = 3600 * y.starters)),
                    (o[h].gameSecondsRemaining = parseInt(g[h].franchise[0].gameSecondsRemaining) + parseInt(g[h].franchise[1].gameSecondsRemaining)),
                    i[g[h].franchise[0].id]++,
                    i[g[h].franchise[1].id]++,
                    (o[h].gameIdRoad = i[g[h].franchise[0].id]),
                    (o[h].gameIdHome = i[g[h].franchise[1].id]),
                    (o[h].fidRoad = g[h].franchise[0].id),
                    (o[h].fidHome = g[h].franchise[1].id),
                    (o[h].scoreRoad = g[h].franchise[0].score),
                    (o[h].scoreHome = g[h].franchise[1].score),
                    (o[h].resultRoad = ""),
                    (o[h].resultHome = ""),
                    (o[h].startersRoad = u.starters),
                    (o[h].startersHome = y.starters),
                    (o[h].spreadRoad = ""),
                    (o[h].spreadHome = "");
            } else {
                (u = { score: g[h].franchise[0].score, gameSecondsRemaining: 0, playersYetToPlay: "0", playersCurrentlyPlaying: "0" }),
                    (y = { score: g[h].franchise[1].score, gameSecondsRemaining: 0, playersYetToPlay: "0", playersCurrentlyPlaying: "0" });
                (o[h].gameSecondsRemaining = 0),
                    i[g[h].franchise[0].id]++,
                    i[g[h].franchise[1].id]++,
                    (o[h].gameIdRoad = i[g[h].franchise[0].id]),
                    (o[h].gameIdHome = i[g[h].franchise[1].id]),
                    (o[h].fidRoad = g[h].franchise[0].id),
                    (o[h].fidHome = g[h].franchise[1].id),
                    (o[h].scoreRoad = g[h].franchise[0].score),
                    (o[h].scoreHome = g[h].franchise[1].score),
                    (o[h].resultRoad = g[h].franchise[0].result),
                    (o[h].resultHome = g[h].franchise[1].result),
                    (o[h].startersRoad = leagueAttributes.MaxStarters),
                    (o[h].startersHome = leagueAttributes.MaxStarters),
                    void 0 === g[h].franchise[0].spread ? ((o[h].spreadRoad = ""), (o[h].spreadHome = g[h].franchise[1].spread)) : ((o[h].spreadRoad = g[h].franchise[0].spread), (o[h].spreadHome = ""));
            }
            if (
                (0 === parseInt(u.playersYetToPlay, 10) && 0 === parseInt(u.playersCurrentlyPlaying, 10) && (u.gameSecondsRemaining = "0"),
                0 === parseInt(y.playersYetToPlay, 10) && 0 === parseInt(y.playersCurrentlyPlaying, 10) && (y.gameSecondsRemaining = "0"),
                (t[g[h].franchise[0].id] = new Array()),
                (t[g[h].franchise[1].id] = new Array()),
                (t[g[h].franchise[0].id] = u),
                (t[g[h].franchise[1].id] = y),
                1 === a)
            ) {
                s[g[h].franchise[0].id] = 0;
                try {
                    for (m = 0; m < g[h].franchise[0].players.player.length; m++)
                        (r[g[h].franchise[0].players.player[m].id] = validateAsNumber(g[h].franchise[0].players.player[m].score)),
                            "starter" === g[h].franchise[0].players.player[m].status &&
                                (s[g[h].franchise[0].id] +=
                                    validateAsNumber(g[h].franchise[0].players.player[m].score) +
                                    (validateAsNumber(g[h].franchise[0].players.player[m].gameSecondsRemaining) / 3600) * validateAsNumber(fsProjections[g[h].franchise[0].players.player[m].id]));
                    0 === g[h].franchise[0].gameSecondsRemaining && (s[g[h].franchise[0].id] = "");
                } catch (e) {
                    MFLNoData = !0;
                }
                s[g[h].franchise[1].id] = 0;
                try {
                    for (m = 0; m < g[h].franchise[1].players.player.length; m++)
                        (r[g[h].franchise[1].players.player[m].id] = validateAsNumber(g[h].franchise[1].players.player[m].score)),
                            "starter" === g[h].franchise[1].players.player[m].status &&
                                (s[g[h].franchise[1].id] +=
                                    validateAsNumber(g[h].franchise[1].players.player[m].score) +
                                    (validateAsNumber(g[h].franchise[1].players.player[m].gameSecondsRemaining) / 3600) * validateAsNumber(fsProjections[g[h].franchise[1].players.player[m].id]));
                    0 === g[h].franchise[1].gameSecondsRemaining && (s[g[h].franchise[1].id] = "");
                } catch (e) {
                    MFLNoData = !0;
                }
            } else {
                try {
                    for (m = 0; m < g[h].franchise[0].player.length; m++) r[g[h].franchise[0].player[m].id] = validateAsNumber(g[h].franchise[0].player[m].score);
                } catch (e) {
                    MFLNoData = !0;
                }
                try {
                    for (m = 0; m < g[h].franchise[1].player.length; m++) r[g[h].franchise[1].player[m].id] = validateAsNumber(g[h].franchise[1].player[m].score);
                } catch (e) {
                    MFLNoData = !0;
                }
            }
        }
    }
    return { teamInfo: t, playerInfo: r, gameInfo: o, paceInfo: s, roadTeam: u, homeTeam: y };
}
function getMFLStartBenchFromAPI(e) {
    var a = new Array();
    if (MFLLiveMode)
        if (((tempAllPlayCheck = void 0 === e.liveScoring.matchup), allPlaySetup || tempAllPlayCheck)) {
            var t = new Array();
            try {
                if (void 0 !== e.liveScoring.matchup.length) for (var r = 0; r < e.liveScoring.matchup.length; r++) (t[t.length] = e.liveScoring.matchup[r].franchise[0]), (t[t.length] = e.liveScoring.matchup[r].franchise[1]);
                else void 0 !== e.liveScoring.matchup && ((t[t.length] = e.liveScoring.matchup.franchise[0]), (t[t.length] = e.liveScoring.matchup.franchise[1]));
            } catch (e) {}
            try {
                if (void 0 !== e.liveScoring.franchise.length) for (r = 0; r < e.liveScoring.franchise.length; r++) t[t.length] = e.liveScoring.franchise[r];
                else void 0 !== e.liveScoring.franchise && (t[t.length] = e.liveScoring.franchise);
            } catch (e) {}
            for (r = 0; r < t.length; r++)
                if (t[r].id === currentAllPlayTeam) {
                    var o = "",
                        n = "";
                    try {
                        for (var s = 0; s < t[r].players.player.length; s++) "nonstarter" === t[r].players.player[s].status ? (o += t[r].players.player[s].id + ",") : (n += t[r].players.player[s].id + ",");
                    } catch (e) {}
                    var i = { nonStarters: o, starters: n };
                    (a[t[r].id] = new Array()), (a[t[r].id] = i), void 0 === futureLineup[t[r].id] && ((futureLineup[t[r].id] = new Array()), (futureLineup[t[r].id] = i));
                }
            for (r = 0; r < t.length; r++)
                if (t[r].id !== currentAllPlayTeam) {
                    (o = ""), (n = "");
                    try {
                        for (s = 0; s < t[r].players.player.length; s++) "nonstarter" === t[r].players.player[s].status ? (o += t[r].players.player[s].id + ",") : (n += t[r].players.player[s].id + ",");
                    } catch (e) {}
                    var l = { nonStarters: o, starters: n };
                    (a[t[r].id] = new Array()), (a[t[r].id] = l), void 0 === futureLineup[t[r].id] && ((futureLineup[t[r].id] = new Array()), (futureLineup[t[r].id] = l));
                }
        } else {
            var c = new Array();
            void 0 !== e.liveScoring.matchup.length ? (c = e.liveScoring.matchup) : (c[0] = e.liveScoring.matchup);
            for (r = 0; r < c.length; r++) {
                var d = c[r].franchise;
                (o = ""), (n = "");
                try {
                    for (s = 0; s < c[r].franchise[0].players.player.length; s++)
                        "nonstarter" === c[r].franchise[0].players.player[s].status ? (o += c[r].franchise[0].players.player[s].id + ",") : (n += c[r].franchise[0].players.player[s].id + ",");
                } catch (e) {}
                (i = { nonStarters: o, starters: n }), (o = ""), (n = "");
                try {
                    for (s = 0; s < c[r].franchise[1].players.player.length; s++)
                        "nonstarter" === c[r].franchise[1].players.player[s].status ? (o += c[r].franchise[1].players.player[s].id + ",") : (n += c[r].franchise[1].players.player[s].id + ",");
                } catch (e) {}
                l = { nonStarters: o, starters: n };
                (a[d[0].id] = new Array()),
                    (a[d[1].id] = new Array()),
                    (a[d[0].id] = i),
                    (a[d[1].id] = l),
                    void 0 === futureLineup[d[0].id] && ((futureLineup[d[0].id] = new Array()), (futureLineup[d[0].id] = i)),
                    void 0 === futureLineup[d[1].id] && ((futureLineup[d[1].id] = new Array()), (futureLineup[d[1].id] = l));
            }
        }
    else if (((tempAllPlayCheck = void 0 === e.weeklyResults.matchup), allPlaySetup || tempAllPlayCheck)) {
        t = new Array();
        try {
            if (void 0 !== e.weeklyResults.matchup.length) for (r = 0; r < e.weeklyResults.matchup.length; r++) (t[t.length] = e.weeklyResults.matchup[r].franchise[0]), (t[t.length] = e.weeklyResults.matchup[r].franchise[1]);
            else void 0 !== e.weeklyResults.matchup && ((t[t.length] = e.weeklyResults.matchup.franchise[0]), (t[t.length] = e.weeklyResults.matchup.franchise[1]));
        } catch (e) {}
        try {
            if (void 0 !== e.weeklyResults.franchise.length) for (r = 0; r < e.weeklyResults.franchise.length; r++) t[t.length] = e.weeklyResults.franchise[r];
            else void 0 !== e.weeklyResults.franchise && (t[t.length] = e.weeklyResults.franchise);
        } catch (e) {}
        for (r = 0; r < t.length; r++)
            if (t[r].id === currentAllPlayTeam) {
                try {
                    i = { nonStarters: t[r].nonstarters, starters: t[r].starters, tiebreaker: t[r].tiebreaker };
                } catch (e) {
                    i = { nonStarters: t[r].nonstarters, starters: t[r].starters };
                }
                (a[t[r].id] = new Array()), (a[t[r].id] = i), void 0 === futureLineup[t[r].id] && ((futureLineup[t[r].id] = new Array()), (futureLineup[t[r].id] = i));
            }
        for (r = 0; r < t.length; r++)
            if (t[r].id !== currentAllPlayTeam) {
                try {
                    l = { nonStarters: t[r].nonstarters, starters: t[r].starters, tiebreaker: t[r].tiebreaker };
                } catch (e) {
                    l = { nonStarters: t[r].nonstarters, starters: t[r].starters };
                }
                (a[t[r].id] = new Array()), (a[t[r].id] = l), void 0 === futureLineup[t[r].id] && ((futureLineup[t[r].id] = new Array()), (futureLineup[t[r].id] = l));
            }
    } else {
        c = new Array();
        void 0 !== e.weeklyResults.matchup.length ? (c = e.weeklyResults.matchup) : (c[0] = e.weeklyResults.matchup);
        for (r = 0; r < c.length; r++) {
            d = c[r].franchise;
            try {
                (i = { nonStarters: d[0].nonstarters, starters: d[0].starters, tiebreaker: d[0].tiebreaker }), (l = { nonStarters: d[1].nonstarters, starters: d[1].starters, tiebreaker: d[1].tiebreaker });
                (hideTiebreakingPlayer || i.tiebreaker.length > 6 || l.tiebreaker.length > 6) && ((i.tiebreaker = ""), (l.tiebreaker = ""));
            } catch (e) {
                (i = { nonStarters: d[0].nonstarters, starters: d[0].starters }), (l = { nonStarters: d[1].nonstarters, starters: d[1].starters });
            }
            (a[d[0].id] = new Array()),
                (a[d[1].id] = new Array()),
                (a[d[0].id] = i),
                (a[d[1].id] = l),
                void 0 === futureLineup[d[0].id] && ((futureLineup[d[0].id] = new Array()), (futureLineup[d[0].id] = i)),
                void 0 === futureLineup[d[1].id] && ((futureLineup[d[1].id] = new Array()), (futureLineup[d[1].id] = l));
        }
    }
    var p = leagueAttributes.Franchises,
        h = 0;
    for (var u in a)
        if (h < p) {
            h++;
            var m = a[u].starters;
            try {
                for (; m.indexOf(",") > 0; ) {
                    var f = m.substring(0, m.indexOf(","));
                    if (parseFloat(f) > 0)
                        if (void 0 === MFLRosterInfo["pid_" + f])
                            (MFLRosterInfo["pid_" + f] = new Array()), (MFLRosterInfo["pid_" + f][0] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Starter", fidOriginal: u, rosterStatusOriginal: "Roster" });
                        else {
                            for (var y = !1, g = 0; g < MFLRosterInfo["pid_" + f].length; g++) MFLRosterInfo["pid_" + f][g].fid === u && ((MFLRosterInfo["pid_" + f][g].playingStatus = "Starter"), (y = !0));
                            !1 === y && (MFLRosterInfo["pid_" + f][MFLRosterInfo["pid_" + f].length] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Starter", fidOriginal: u, rosterStatusOriginal: "Roster" });
                        }
                    m = m.substring(m.indexOf(",") + 1, m.length);
                }
            } catch (e) {}
            m = a[u].nonStarters;
            try {
                for (; m.indexOf(",") > 0; ) {
                    f = m.substring(0, m.indexOf(","));
                    if (parseFloat(f) > 0)
                        if (void 0 === MFLRosterInfo["pid_" + f])
                            (MFLRosterInfo["pid_" + f] = new Array()), (MFLRosterInfo["pid_" + f][0] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Bench", fidOriginal: u, rosterStatusOriginal: "Roster" });
                        else {
                            for (y = !1, g = 0; g < MFLRosterInfo["pid_" + f].length; g++) MFLRosterInfo["pid_" + f][g].fid === u && ((MFLRosterInfo["pid_" + f][g].playingStatus = "Bench"), (y = !0));
                            !1 === y && (MFLRosterInfo["pid_" + f][MFLRosterInfo["pid_" + f].length] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Bench", fidOriginal: u, rosterStatusOriginal: "Roster" });
                        }
                    m = m.substring(m.indexOf(",") + 1, m.length);
                }
            } catch (e) {}
            f = a[u].tiebreaker;
            try {
                if (parseFloat(f) > 0)
                    if (void 0 === MFLRosterInfo["pid_" + f])
                        (MFLRosterInfo["pid_" + f] = new Array()), (MFLRosterInfo["pid_" + f][0] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Tiebreaker", fidOriginal: u, rosterStatusOriginal: "Roster" });
                    else {
                        for (y = !1, g = 0; g < MFLRosterInfo["pid_" + f].length; g++) MFLRosterInfo["pid_" + f][g].fid === u && ((MFLRosterInfo["pid_" + f][g].playingStatus = "Tiebreaker"), (y = !0));
                        !1 === y && (MFLRosterInfo["pid_" + f][MFLRosterInfo["pid_" + f].length] = { pid: f, fid: u, rosterStatus: "Roster", playingStatus: "Tiebreaker", fidOriginal: u, rosterStatusOriginal: "Roster" });
                    }
            } catch (e) {}
        }
    return a;
}
function doMFLNFLMatchup(e, a, t) {
    var r = baseURLDynamic + "/" + year + "/pro_matchup?L=" + league_id + "&W=" + t + "&MATCHUP=" + e + "," + a;
    window.open(r, "nflMatchups");
}
function getMFLNFLSchedule(e) {
    for (var a = e.nflSchedule.matchup, t = new Array(), r = 0; r < a.length; r++) {
        if (
            (void 0 === nflTeamUpdate[MFLCurrentWeek] && (nflTeamUpdate[MFLCurrentWeek] = new Array()),
            void 0 === nflTeamUpdate[MFLCurrentWeek][r] &&
                ((nflTeamUpdate[MFLCurrentWeek][r] = new Array()),
                (nflTeamUpdate[MFLCurrentWeek][r].kickoff = parseInt(a[r].kickoff)),
                (nflTeamUpdate[MFLCurrentWeek][r].gameSecondsRemaining = parseInt(a[r].gameSecondsRemaining)),
                (nflTeamUpdate[MFLCurrentWeek][r].roadHasPossession = a[r].team[0].hasPossession),
                (nflTeamUpdate[MFLCurrentWeek][r].homeHasPossession = a[r].team[1].hasPossession),
                (nflTeamUpdate[MFLCurrentWeek][r].roadInRedZone = a[r].team[0].inRedZone),
                (nflTeamUpdate[MFLCurrentWeek][r].homeInRedZone = a[r].team[1].inRedZone),
                (nflTeamUpdate[MFLCurrentWeek][r].roadScore = parseInt(validateAsNumber(a[r].team[0].score))),
                (nflTeamUpdate[MFLCurrentWeek][r].homeScore = parseInt(validateAsNumber(a[r].team[1].score))),
                (nflTeamUpdate[MFLCurrentWeek][r].roadSpread = parseInt(validateAsNumber(a[r].team[0].spread))),
                (nflTeamUpdate[MFLCurrentWeek][r].homeSpread = parseInt(validateAsNumber(a[r].team[1].spread))),
                (nflTeamUpdate[MFLCurrentWeek][r].roadID = a[r].team[0].id),
                (nflTeamUpdate[MFLCurrentWeek][r].homeID = a[r].team[1].id),
                (nflTeamUpdate[MFLCurrentWeek][r].roadOldScore = parseInt(a[r].team[0].score)),
                (nflTeamUpdate[MFLCurrentWeek][r].homeOldScore = parseInt(a[r].team[1].score)),
                (nflTeamUpdate[MFLCurrentWeek][r].roadNewScoreGameSecondsRemaining = 3601),
                (nflTeamUpdate[MFLCurrentWeek][r].homeNewScoreGameSecondsRemaining = 3601),
                (nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1),
                (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1)),
            0 === parseInt(a[r].gameSecondsRemaining) && 0 === parseInt(a[r].team[0].score) && 0 === parseInt(a[r].team[1].score))
        ) {
            var o = 3600;
            (nflTeamUpdate[MFLCurrentWeek][r].gameSecondsRemaining = 3600), (nflTeamUpdate[MFLCurrentWeek][r].newScoreGameSecondsRemaining = 3600);
        } else o = parseInt(a[r].gameSecondsRemaining);
        var n = nflTeamUpdate[MFLCurrentWeek][r].kickoff,
            s = parseInt(n);
        if (currentServerTime > s || o < 3600) {
            var i = "",
                l = "";
            o < nflTeamUpdate[MFLCurrentWeek][r].gameSecondsRemaining &&
                ((nflTeamUpdate[MFLCurrentWeek][r].kickoff = parseInt(a[r].kickoff)),
                (nflTeamUpdate[MFLCurrentWeek][r].gameSecondsRemaining = o),
                (nflTeamUpdate[MFLCurrentWeek][r].roadHasPossession = a[r].team[0].hasPossession),
                (nflTeamUpdate[MFLCurrentWeek][r].homeHasPossession = a[r].team[1].hasPossession),
                (nflTeamUpdate[MFLCurrentWeek][r].roadInRedZone = a[r].team[0].inRedZone),
                (nflTeamUpdate[MFLCurrentWeek][r].homeInRedZone = a[r].team[1].inRedZone),
                (nflTeamUpdate[MFLCurrentWeek][r].roadScore = parseInt(validateAsNumber(a[r].team[0].score))),
                (nflTeamUpdate[MFLCurrentWeek][r].homeScore = parseInt(validateAsNumber(a[r].team[1].score))),
                (nflTeamUpdate[MFLCurrentWeek][r].roadID = a[r].team[0].id),
                (nflTeamUpdate[MFLCurrentWeek][r].homeID = a[r].team[1].id),
                (nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1),
                (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1)),
                (o = nflTeamUpdate[MFLCurrentWeek][r].gameSecondsRemaining),
                nflTeamUpdate[MFLCurrentWeek][r].roadNewScoreGameSecondsRemaining === o || nflTeamUpdate[MFLCurrentWeek][r].roadScore > nflTeamUpdate[MFLCurrentWeek][r].roadOldScore
                    ? ((nflTeamUpdate[MFLCurrentWeek][r].roadNewScoreGameSecondsRemaining = o),
                      (nflTeamUpdate[MFLCurrentWeek][r].roadOldScore = nflTeamUpdate[MFLCurrentWeek][r].roadScore),
                      (nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !0),
                      (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1))
                    : nflTeamUpdate[MFLCurrentWeek][r].homeNewScoreGameSecondsRemaining === o || nflTeamUpdate[MFLCurrentWeek][r].homeScore > nflTeamUpdate[MFLCurrentWeek][r].homeOldScore
                    ? ((nflTeamUpdate[MFLCurrentWeek][r].homeNewScoreGameSecondsRemaining = o),
                      (nflTeamUpdate[MFLCurrentWeek][r].homeOldScore = nflTeamUpdate[MFLCurrentWeek][r].homeScore),
                      (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !0),
                      (nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1))
                    : ((nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1), (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1)),
                (1 !== nflTeamUpdate[MFLCurrentWeek][r].roadHasPossession && 1 !== nflTeamUpdate[MFLCurrentWeek][r].roadInRedZone) || (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1),
                (1 !== nflTeamUpdate[MFLCurrentWeek][r].homeHasPossession && 1 !== nflTeamUpdate[MFLCurrentWeek][r].homeInRedZone) || (nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1),
                0 === o && ((nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore = !1), (nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore = !1));
            s = parseInt(nflTeamUpdate[MFLCurrentWeek][r].kickoff);
        }
        var c = nflTeamUpdate[MFLCurrentWeek][r].roadID,
            d = nflTeamUpdate[MFLCurrentWeek][r].homeID,
            p = nflTeamUpdate[MFLCurrentWeek][r].roadScore,
            h = nflTeamUpdate[MFLCurrentWeek][r].homeScore,
            u = nflTeamUpdate[MFLCurrentWeek][r].roadScore,
            m = nflTeamUpdate[MFLCurrentWeek][r].homeScore,
            f = nflTeamUpdate[MFLCurrentWeek][r].roadSpread,
            y = nflTeamUpdate[MFLCurrentWeek][r].homeSpread,
            g = ((i = nflTeamUpdate[MFLCurrentWeek][r].roadHasPossession), (l = nflTeamUpdate[MFLCurrentWeek][r].homeHasPossession), nflTeamUpdate[MFLCurrentWeek][r].roadInRedZone),
            L = nflTeamUpdate[MFLCurrentWeek][r].homeInRedzone,
            b = nflTeamUpdate[MFLCurrentWeek][r].roadRecentScore,
            F = nflTeamUpdate[MFLCurrentWeek][r].homeRecentScore,
            M = a[r].team[1].passOffenseRank,
            v = a[r].team[0].passOffenseRank,
            S = a[r].team[1].rushOffenseRank,
            k = a[r].team[0].rushOffenseRank,
            I = a[r].team[1].passDefenseRank,
            T = a[r].team[0].passDefenseRank,
            P = a[r].team[1].rushDefenseRank,
            R = a[r].team[0].rushDefenseRank,
            w = parseInt((parseInt(M) + parseInt(S)) / 2),
            D = parseInt((parseInt(v) + parseInt(k)) / 2),
            C = parseInt((parseInt(I) + parseInt(P)) / 2),
            N = parseInt((parseInt(T) + parseInt(R)) / 2),
            A = "",
            x = "";
        1 === g && (A = "<img src='" + redZoneImage + "' alt='" + c + " is in the Redzone' title='" + c + " is in the Redzone' />"),
            1 === L && (x = "<img src='" + redZoneImage + "' alt='" + d + " is in the Redzone' title='" + d + " is in the Redzone' />"),
            "" === A && 1 === i && (A = "<img src='" + hasBallImage + "' alt='" + c + " has possession' title='" + c + " has possession' />"),
            "" === x && 1 === l && (x = "<img src='" + hasBallImage + "' alt='" + d + " has possession' title='" + d + " has possession' />"),
            b && ((A = "<img src='" + newScoreImage + "' alt='" + c + " has possession' title='" + c + " has recent score' />"), (x = "")),
            F && ((x = "<img src='" + newScoreImage + "' alt='" + d + " has possession' title='" + d + " has recent score' />"), (A = ""));
        var W = "";
        if (
            (0 === parseInt(o) && (W = "Final"),
            3600 === parseInt(o) &&
                ((W = MFLCurrentWeek === liveScoringWeek ? formatHabDate(new Date(1e3 * s), "ddd h:mm") : formatHabDate(new Date(1e3 * s), "MM/d h:mm")),
                (p = ""),
                (h = ""),
                (u = ""),
                (m = ""),
                parseInt(f) < 0 && (p = f),
                parseInt(y) < 0 && (h = y)),
            1800 === parseInt(o) && (W = "Half"),
            parseInt(o) > 0 && parseInt(o) < 900 && (W = "4Q " + formatHabDate(new Date(1e3 * parseInt(o)), "mm:ss")),
            parseInt(o) >= 900 && parseInt(o) < 1800 && (W = "3Q " + formatHabDate(new Date(1e3 * (parseInt(o) - 900)), "mm:ss")),
            parseInt(o) > 1800 && parseInt(o) < 2700 && (W = "2Q " + formatHabDate(new Date(1e3 * (parseInt(o) - 1800)), "mm:ss")),
            parseInt(o) >= 2700 && parseInt(o) < 3600 && (W = "1Q " + formatHabDate(new Date(1e3 * (parseInt(o) - 2700)), "mm:ss")),
            useNFLIconInPlayerTable)
        )
            var U = " <span style='vertical-align:middle'>" + u + " @ " + m + "</span> <img src='" + nflLogoPath + d + "." + nflLogoExt + "' title='" + getNFLFullName(d) + "' class='nflicon' style='height:16px;vertical-align:middle' />",
                $ = " <span style='vertical-align:middle'>" + m + " v " + u + "</span> <img src='" + nflLogoPath + c + "." + nflLogoExt + "' title='" + getNFLFullName(c) + "' class='nflicon' style='height:16px;vertical-align:middle' />";
        else (U = " " + u + " @ " + d + " " + m), ($ = " " + m + " v " + c + " " + u);
        (t[c] = { status: U, secondsRemaining: o, kickoffTime: s, scoreClock: W, image: A, passOffRank: M, rushOffRank: S, avgOffRank: w, passDefRank: I, rushDefRank: P, avgDefRank: C, ownScore: p, oppId: d, oppScore: h, kickoff: n }),
            (t[d] = { status: $, secondsRemaining: o, kickoffTime: s, scoreClock: W, image: x, passOffRank: v, rushOffRank: k, avgOffRank: D, passDefRank: T, rushDefRank: R, avgDefRank: N, ownScore: h, oppId: c, oppScore: p, kickoff: n });
    }
    return t;
}
function getMFLNFLBoxSchedule(e) {
    for (var a = e.nflSchedule.matchup, t = new Array(), r = 0; r < a.length; r++) {
        var o = a[r].gameSecondsRemaining,
            n = parseInt(validateAsNumber(a[r].kickoff)),
            s = a[r].team[0].id,
            i = a[r].team[1].id,
            l = a[r].team[0].score,
            c = a[r].team[1].score;
        (0 !== parseInt(l) && "" !== l) || (0 !== parseInt(c) && "" !== c) || (0 !== parseInt(o) && "" !== o) || (o = 3600);
        var d = a[r].team[0].hasPossession,
            p = a[r].team[1].hasPossession,
            h = a[r].team[0].inRedZone,
            u = a[r].team[1].inRedZone,
            m = "",
            f = "";
        1 === h && (m = "<img src='" + redZoneImage + "' alt='" + s + " is in the Redzone' title='" + s + " is in the Redzone' />"),
            1 === u && (f = "<img src='" + redZoneImage + "' alt='" + i + " is in the Redzone' title='" + i + " is in the Redzone' />"),
            "" === m && 1 === d && (m = "<img src='" + hasBallImage + "' alt='" + s + " has possession' title='" + s + " has possession' />"),
            "" === f && 1 === p && (f = "<img src='" + hasBallImage + "' alt='" + i + " has possession' title='" + i + " has possession' />");
        var y = "";
        0 === parseInt(o) && (y = "Final"),
            3600 === parseInt(o) && (y = MFLCurrentWeek === liveScoringWeek ? formatHabDate(new Date(1e3 * n), "ddd  h:mm") : formatHabDate(new Date(1e3 * n), "ddd  MM/d  h:mm")),
            1800 === parseInt(o) && (y = "Half"),
            parseInt(o) > 0 && parseInt(o) < 900 && (y = "4th - " + formatHabDate(new Date(1e3 * parseInt(o)), "m:ss")),
            parseInt(o) >= 900 && parseInt(o) < 1800 && (y = "3rd - " + formatHabDate(new Date(1e3 * (parseInt(o) - 900)), "m:ss")),
            parseInt(o) > 1800 && parseInt(o) < 2700 && (y = "2nd - " + formatHabDate(new Date(1e3 * (parseInt(o) - 1800)), "m:ss")),
            parseInt(o) >= 2700 && parseInt(o) < 3600 && (y = "1st - " + formatHabDate(new Date(1e3 * (parseInt(o) - 2700)), "m:ss")),
            (t[r] = new Array()),
            (t[r].road = { nflID: s, score: l, secondsRemaining: o, kickoffTime: n, scoreClock: y, image: m, fullName: getNFLFullName(s) }),
            (t[r].home = { nflID: i, score: c, secondsRemaining: o, kickoffTime: n, scoreClock: y, image: f, fullName: getNFLFullName(i) });
    }
    return t;
}
function createWeeklyNavigation() {
    var e = "";
    e += "<table class='MFLWeeklyNavigation mobile-hide' style='width:initial;'><tbody><tr>";
    for (var a = parseInt(MFLLeagueInfo.startWeek); a <= MFLEndWeek; a++) {
        if (a > parseInt(MFLLeagueInfo.lastRegularSeasonWeek)) var t = "P";
        else t = "";
        a === MFLCurrentWeek
            ? (e += "<td class='navWeekCurr' title='current week'> " + t + a + " </td>")
            : a > parseInt(MFLLeagueInfo.lastRegularSeasonWeek) && a > liveScoringWeek && (a - 1 !== liveScoringWeek || !MFLNextWeeksPlayoffMatchupSet)
            ? (e += "<td class='navWeekInactive' title='games not yet scheduled'> " + t + a + " </td>")
            : (e += "<td class='navWeekLink' title='view week " + t + a + "'><a href='#week" + a + "' onclick=\"updateCurrentWeekSetup('" + a + "')\"> " + t + a + " </a></td>"),
            a !== MFLEndWeek && (e += "<td class='navdash'>|</td>");
    }
    (e += "</tr></tbody></table>"),
        (e +=
            "<table class='MFLWeeklyNavigation desktop-hide-table'><tbody><tr><td><form class='reportform'>Select Week: <select size='1' id='scoreboardWeek' onchange='updateCurrentWeekSetup(document.getElementById(\"scoreboardWeek\").value)'>");
    for (a = parseInt(MFLLeagueInfo.startWeek); a <= MFLEndWeek; a++) {
        if (a > parseInt(MFLLeagueInfo.lastRegularSeasonWeek)) t = "P";
        else t = "";
        a === MFLCurrentWeek
            ? (e += "<option value='" + a + "' selected='selected'>" + t + " Week " + a + " </option>")
            : a > parseInt(MFLLeagueInfo.lastRegularSeasonWeek) && a > liveScoringWeek && (a - 1 !== liveScoringWeek || !MFLNextWeeksPlayoffMatchupSet)
            ? (e += "<option value='" + a + "' disabled='disabled'>" + t + " Week " + a + "</option>")
            : (e += "<option value='" + a + "'>" + t + " Week " + a + "</option>");
    }
    return (e += "</select></form></td></tr></tbody></table>");
}
function createMFLMatchupTable(e, a) {
    try {
        doubleHeader[e[a].road.fid]++, doubleHeader[e[a].home.fid]++;
    } catch (e) {}
    var t = "";
    if (a < e.length) {
        if (((e[a].road.fid !== myUpdateTeam && e[a].home.fid !== myUpdateTeam) || (currentGameHilighted = a), miniScoreboardUseAbbrev))
            var r = (i = getTeamName(e[a].road.fid)).abbrev,
                o = i.title,
                n = (i = getTeamName(e[a].home.fid)).abbrev,
                s = i.title;
        else {
            var i;
            (r = (i = getTeamName(e[a].road.fid)).name), (o = ""), (n = (i = getTeamName(e[a].home.fid)).name), (s = "");
        }
        var l = r,
            c = n;
        "" !== miniScoreboardIconBase && "" !== miniScoreboardIconExt
            ? ("BYE" !== r && "AVG" !== r && (l = "<img src='" + miniScoreboardIconBase + e[a].road.fid + "." + miniScoreboardIconExt + "' />"),
              "BYE" !== n && "AVG" !== n && (c = "<img src='" + miniScoreboardIconBase + e[a].home.fid + "." + miniScoreboardIconExt + "' />"))
            : miniScoreboardUseIcon
            ? ("BYE" !== r && "AVG" !== r && (l = "<img src='" + franchiseDatabase["fid_" + e[a].road.fid].icon + "' />"), "BYE" !== n && "AVG" !== n && (c = "<img src='" + franchiseDatabase["fid_" + e[a].home.fid].icon + "' />"))
            : miniScoreboardUseLogo &&
              ("BYE" !== r && "AVG" !== r && (l = "<img src='" + franchiseDatabase["fid_" + e[a].road.fid].logo + "' />"), "BYE" !== n && "AVG" !== n && (c = "<img src='" + franchiseDatabase["fid_" + e[a].home.fid].logo + "' />")),
            "" !== l && miniScoreboardUseAbbrev && (l += " " + r),
            "" !== c && miniScoreboardUseAbbrev && (c += " " + n),
            (t += "<table class='MFLGameTable matchupLolite' title='View " + r + " @ " + n + " Game Details' id='matchup_" + a + "' onclick='setMFLMatchup(" + a + ")'><tbody>"),
            (t +=
                "<tr><td class='MFLLiveTeam'>" +
                l +
                "</td><td class='MFLPaceScore' id='fidPace_" +
                e[a].road.fid +
                doubleHeader[e[a].road.fid] +
                "'></td><td class='MFLLiveScore' id='fid_" +
                e[a].road.fid +
                doubleHeader[e[a].road.fid] +
                "'" +
                o +
                "></td><td class='MFLWinMarker' id='fidWin_" +
                e[a].road.fid +
                doubleHeader[e[a].road.fid] +
                "'></td></tr>"),
            (t +=
                "<tr><td class='MFLLiveTeam'>" +
                c +
                "</td><td class='MFLPaceScore' id='fidPace_" +
                e[a].home.fid +
                doubleHeader[e[a].home.fid] +
                "'></td><td class='MFLLiveScore' id='fid_" +
                e[a].home.fid +
                doubleHeader[e[a].home.fid] +
                "'" +
                s +
                "></td><td class='MFLWinMarker' id='fidWin_" +
                e[a].home.fid +
                doubleHeader[e[a].home.fid] +
                "'></td></tr>"),
            (t += "<tr><td colspan='4' class='MFLLiveClock' id='cid_" + a + "'></td></tr>"),
            (t += "</tbody></table>");
    } else (t += "<table class='MFLGameTableInactive'><tbody>"), (t += "<tr><td> </td><td> </td><td> </td></tr>"), (t += "<tr><td> </td><td> </td><td> </td></tr>"), (t += "<tr><td colspan='4'> </td></tr>"), (t += "</tbody></table>");
    return t;
}
function createNFLMFLMatchupTable(e, a) {
    var t = "";
    return (
        a < e.length
            ? ((t += "<table class='MFLNFLGameTable class='matchupLolite' title='View " + e[a].road.fullName + " @ " + e[a].home.fullName + " Game Details' id='matchupNFL_" + a + "' onclick='setMFLNFLMatchup(\"" + a + "\")'><tbody>"),
              (t +=
                  "<tr><td class='MFLNFLLiveTeam'><img src='" +
                  nflLogoPath +
                  e[a].road.nflID +
                  "." +
                  nflLogoExt +
                  "' class='nflicon' /></td><td class='MFLNFLBall' id='ballfid_" +
                  e[a].road.nflID +
                  "'></td><td class='MFLNFLLiveScore' id='fid_" +
                  e[a].road.nflID +
                  "'></td><td class='MFLNFLWinMarker' id='fidWin_" +
                  e[a].road.nflID +
                  "'></td></tr>"),
              (t +=
                  "<tr><td class='MFLNFLLiveTeam'><img src='" +
                  nflLogoPath +
                  e[a].home.nflID +
                  "." +
                  nflLogoExt +
                  "' class='nflicon' /></td><td class='MFLNFLBall' id='ballfid_" +
                  e[a].home.nflID +
                  "'></td><td class='MFLNFLLiveScore' id='fid_" +
                  e[a].home.nflID +
                  "'></td><td class='MFLNFLWinMarker' id='fidWin_" +
                  e[a].home.nflID +
                  "'></td></tr>"),
              (t += "<tr><td colspan='4' class='MFLNFLLiveClock' id='nfl_" + e[a].home.nflID + "'></td></tr>"),
              (t += "</tbody></table>"))
            : ((t += "<table class='MFLNFLGameTableInactive'><tbody>"),
              (t += "<tr><td> </td><td> </td><td> </td><td> </td></tr>"),
              (t += "<tr><td> </td><td> </td><td> </td><td> </td></tr>"),
              (t += "<tr><td colspan='4'> </td></tr>"),
              (t += "</tbody></table>")),
        t
    );
}
function createBoxScoreTables() {
    setupDoubleHeaderArray(),
        $.ajax({
            type: "GET",
            url: baseURLDynamic + "/" + year + "/export?TYPE=liveScoring&L=" + league_id + "&DETAILS=1&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random(),
            async: !1,
            liveScoringData: { USER_ID: userCookieValue },
        }).done(function (e) {
            (MFLLiveScoringMatchups = getMFLLiveScoringData(e)), (e = null);
        });
    var e = "<table class='MFLGameLinks'><tbody>";
    if (liveScoringEmpty)
        (e += "<tr class='oddtablerow'>"),
            (e += "<td style='font-size:15px'>"),
            (e +=
                "<span class='MFLSuspendedMessage'><br /><br />MFL LiveScoring is temporarily suspended as all server resources are being used to accept late lineup submissions.<br /><br />The scoreboard is not broken as this is typical before early kickoff times.<br /><br />Please refresh this page closer to kickoff to view the scoreboard in its entirety.<br /><br /></span>"),
            (e += "</td>"),
            (e += "</tr>"),
            (e += "</tbody></table>");
    else {
        if (matchupsPerRow > MFLLiveScoringMatchups.length) var a = MFLLiveScoringMatchups.length;
        else a = matchupsPerRow;
        for (var t = parseInt((MFLLiveScoringMatchups.length + (a - 0.5)) / a), r = 0; r < t; r++) {
            e += "<tr>";
            for (var o = 0; o < a; o++) {
                e += "<td>";
                var n = parseInt(r * a + o);
                (e += createMFLMatchupTable(MFLLiveScoringMatchups, n)), (e += "</td>");
            }
            e += "</tr>";
        }
        e += "</table>";
    }
    return e;
}
function createNFLBoxScoreTables() {
    var e = "";
    for (
        e += "<table class='MFLGameLinks'><tbody>",
            $.ajax({ type: "GET", url: baseURLDynamic + "/" + year + "/export?TYPE=nflSchedule&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random(), async: !1, nflBoxScheduleData: { USER_ID: userCookieValue } }).done(
                function (e) {
                    (MFLNFLLiveScoringMatchups = getMFLNFLBoxSchedule(e)), (e = null);
                }
            ),
            e += " <tr>",
            y = 0;
        y < 3;
        y++
    )
        for (var a = 0; a < MFLNFLLiveScoringMatchups.length; a++) {
            var t = parseInt(MFLNFLLiveScoringMatchups[a].road.secondsRemaining);
            if ((0 === y && t > 0 && t < 3600) || (1 === y && 3600 === t) || (2 === y && 0 === t)) (e += "  <td>"), (e += createNFLMFLMatchupTable(MFLNFLLiveScoringMatchups, a)), (e += "  </td>");
        }
    return (e += " </tr>"), (e += "</tbody></table>");
}
function createMainScoreboardTable() {
    return (
        "<table class='MFLMainScoreboard'><tbody>",
        " <tr>",
        "  <td rowspan='5' style='display:none'></td>",
        "  <td id='MFLRoadTeamName'></td>",
        "  <td colspan='6' rowspan='2' id='MFLCenterTop'></td>",
        "  <td id='MFLHomeTeamName'></td>",
        "  <td rowspan='5' style='display:none'></td>",
        " </tr>",
        " <tr>",
        "  <td id='MFLRoadTeamRecord'> </td>",
        "  <td id='MFLHomeTeamRecord'> </td>",
        " </tr>",
        " <tr>",
        "  <td rowspan='2' id='MFLRoadScore' style='white-space:nowrap'></td>",
        "  <td class='MFLScoreboardTitle' title='Players Currently Playing'>P</td>",
        "  <td class='MFLScoreboardTitle' title='Players Yet to Play'>YTP</td>",
        "  <td class='MFLScoreboardTitle' title='Player Minutes Remaining'>PMR</td>",
        "  <td class='MFLScoreboardTitle' title='Player Minutes Remaining'>PMR</td>",
        "  <td class='MFLScoreboardTitle' title='Players Yet to Play'>YTP</td>",
        "  <td class='MFLScoreboardTitle' title='Players Currently Playing'>P</td>",
        "  <td rowspan='2' id='MFLHomeScore' style='white-space:nowrap'> </td>",
        " </tr>",
        " <tr>",
        "  <td id='MFLRoadPlayers' title='Players Currently Playing'> </td>",
        "  <td id='MFLRoadYTP' title='Players Yet to Play'> </td>",
        "  <td id='MFLRoadPMR' title='Player Minutes Remaining'> </td>",
        "  <td id='MFLHomePMR' title='Player Minutes Remaining'> </td>",
        "  <td id='MFLHomeYTP' title='Players Yet to Play'> </td>",
        "  <td id='MFLHomePlayers' title='Players Currently Playing'> </td>",
        " </tr>",
        "</tbody></table>",
        "<table class='MFLMainScoreboard'><tbody> <tr>  <td rowspan='5' style='display:none'></td>  <td id='MFLRoadTeamName'></td>  <td colspan='6' rowspan='2' id='MFLCenterTop'></td>  <td id='MFLHomeTeamName'></td>  <td rowspan='5' style='display:none'></td> </tr> <tr>  <td id='MFLRoadTeamRecord'> </td>  <td id='MFLHomeTeamRecord'> </td> </tr> <tr>  <td rowspan='2' id='MFLRoadScore' style='white-space:nowrap'></td>  <td class='MFLScoreboardTitle' title='Players Currently Playing'>P</td>  <td class='MFLScoreboardTitle' title='Players Yet to Play'>YTP</td>  <td class='MFLScoreboardTitle' title='Player Minutes Remaining'>PMR</td>  <td class='MFLScoreboardTitle' title='Player Minutes Remaining'>PMR</td>  <td class='MFLScoreboardTitle' title='Players Yet to Play'>YTP</td>  <td class='MFLScoreboardTitle' title='Players Currently Playing'>P</td>  <td rowspan='2' id='MFLHomeScore' style='white-space:nowrap'> </td> </tr> <tr>  <td id='MFLRoadPlayers' title='Players Currently Playing'> </td>  <td id='MFLRoadYTP' title='Players Yet to Play'> </td>  <td id='MFLRoadPMR' title='Player Minutes Remaining'> </td>  <td id='MFLHomePMR' title='Player Minutes Remaining'> </td>  <td id='MFLHomeYTP' title='Players Yet to Play'> </td>  <td id='MFLHomePlayers' title='Players Currently Playing'> </td> </tr></tbody></table>"
    );
}
function MFLPopulateLineupTable(e, a, t) {
    var r = "",
        o = "";
    o = "<table class='MFLTeamLineup report'><caption class='desktop-hide-caption'><span>" + franchiseDatabase["fid_" + a].name + "</span></caption><tbody>";
    for (var n = !1, s = 0; s < 3; s++) {
        switch (s) {
            case 0:
                var i = "Starters";
                ("" === (d = rosterData[a].starters) || null === d) && MFLCurrentWeek > liveScoringWeek && ((d = futureLineup[a].starters), (i = "* Starters"));
                var l = "Starter",
                    c = includeStarterTotals;
                break;
            case 1:
                i = "Tiebreaker";
                "" !== (d = rosterData[a].tiebreaker) && (d += ","), ("" === d || null === d) && MFLCurrentWeek > liveScoringWeek && ("" !== (d = futureLineup[a].tiebreaker) && (d += ","), (i = "* Tiebreaker"));
                (l = "Tiebreaker"), (c = !1);
                break;
            case 2:
                var d;
                i = "Bench";
                ("" === (d = rosterData[a].nonStarters) || null === d) && MFLCurrentWeek > liveScoringWeek && ((d = futureLineup[a].nonStarters), (i = "* Bench"));
                (l = "Bench"), (c = includeBenchTotals);
        }
        var p = new Array(),
            h = 0,
            u = 0,
            m = 0,
            f = 0;
        try {
            for (; d.indexOf(",") > 0; ) {
                var y = d.substring(0, d.indexOf(","));
                if ((1 === s && (r = y), 2 !== s || (2 === s && y !== r))) {
                    if (void 0 === MFLRosterInfo["pid_" + y])
                        (MFLRosterInfo["pid_" + y] = new Array()), (MFLRosterInfo["pid_" + y][0] = { pid: y, fid: a, rosterStatus: "Roster", playingStatus: l, fidOriginal: a, rosterStatusOriginal: "Roster" });
                    else {
                        for (var g = !1, L = 0; L < MFLRosterInfo["pid_" + y].length; L++) MFLRosterInfo["pid_" + y][L].fid === a && ((MFLRosterInfo["pid_" + y][L].playingStatus = l), (g = !0));
                        !1 === g && (MFLRosterInfo["pid_" + y][MFLRosterInfo["pid_" + y].length] = { pid: y, fid: a, rosterStatus: "Roster", playingStatus: l, fidOriginal: fid, rosterStatusOriginal: "Roster" });
                    }
                    try {
                        var b = " (<span class='warning injuredstatus' title='" + MFLInjuryInfo[y].status + ": " + MFLInjuryInfo[y].details + "'>" + MFLInjuryInfo[y].code + "</span>)";
                    } catch (e) {
                        b = "";
                    }
                    try {
                        var F = t[MFLPlayerInfo[y].team].status,
                            M = t[MFLPlayerInfo[y].team].image,
                            v = t[MFLPlayerInfo[y].team].scoreClock,
                            S = t[MFLPlayerInfo[y].team].secondsRemaining,
                            k = t[MFLPlayerInfo[y].team].passOffRank,
                            I = t[MFLPlayerInfo[y].team].rushOffRank,
                            T = t[MFLPlayerInfo[y].team].avgOffRank,
                            P = t[MFLPlayerInfo[y].team].passDefRank,
                            R = t[MFLPlayerInfo[y].team].rushDefRank,
                            w = t[MFLPlayerInfo[y].team].avgDefRank;
                    } catch (e) {
                        (F = ""), (M = ""), (v = ""), (S = 0), (k = 0), (I = 0), (T = 0), (P = 0), (R = 0), (w = 0);
                    }
                    if (void 0 !== e.playerInfo[y]) var D = parseFloat(e.playerInfo[y]).toFixed(precision);
                    else D = 0;
                    if (((u += parseFloat(D)), includeProjections))
                        if (MFLLiveMode) {
                            void 0 === fsProjections[y] && (fsProjections[y] = 0);
                            try {
                                var C = parseInt(t[MFLPlayerInfo[y].team].secondsRemaining);
                            } catch (e) {
                                C = 0;
                            }
                            var N = (C / 3600) * parseFloat(fsProjections[y]),
                                A = N + parseFloat(D),
                                x = '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Pace Breakdown</span></caption><tbody>';
                            if (
                                ((x += '<tr><th colspan="2" style="font-weight:bold;text-align:left;">' + MFLPlayerInfo[y].name + " " + MFLPlayerInfo[y].team + " " + MFLPlayerInfo[y].position + "</th></tr>"),
                                (x += '<tr class="oddtablerow"><td style="text-align:left;">  Seconds Remaining as % </td><td style="text-align:right">' + parseFloat((100 * C) / 3600).toFixed(1) + "%</td></tr>"),
                                (x += '<tr class="oddtablerow"><td style="text-align:left;">  Original Projection </td><td style="text-align:right">' + parseFloat(fsProjections[y]).toFixed(precision) + "</td></tr>"),
                                (x += '<tr class="oddtablerow"><td style="text-align:left;">  Remaining Projected Points </td><td style="text-align:right">' + parseFloat(N).toFixed(precision) + "</td></tr>"),
                                (x += '<tr class="oddtablerow"><td style="text-align:left;">  Actual Points Scored </td><td style="text-align:right">' + parseFloat(D).toFixed(precision) + "</td></tr>"),
                                (x += '<tr class="oddtablerow"><td style="text-align:left;font-weight:bold">On Pace Points: </td><td style="text-align:right;font-weight:bold">' + parseFloat(A).toFixed(precision) + "</td></tr>"),
                                parseFloat(A) > parseFloat(fsProjections[y]))
                            )
                                var W = '<span style="font-size:18px">+ </span>';
                            else if (parseFloat(A) < parseFloat(fsProjections[y])) W = '<span style="font-size:18px">- </span>';
                            else W = "";
                            x +=
                                '<tr class="oddtablerow"><td style="text-align:left;font-weight:bold">Difference: </td><td style="text-align:right;font-weight:bold">' +
                                W +
                                Math.abs(parseFloat(A) - parseFloat(fsProjections[y])).toFixed(precision) +
                                "</td></tr>";
                            var U = "<td class='MFLPlayerProjections mobile-hide' style='cursor:help' rel='scoreboardTooltip' hint='" + (x += "</tbody></table>") + "'>" + parseFloat(A).toFixed(precision) + " </td>";
                            (m += parseFloat(fsProjections[y])), (f += A);
                        } else if (void 0 === fsProjections[y]) U = "<td class='MFLPlayerProjections mobile-hide'>" + parseFloat(0).toFixed(precision) + " </td>";
                        else {
                            U = "<td class='MFLPlayerProjections mobile-hide'>" + parseFloat(fsProjections[y]).toFixed(precision) + " </td>";
                            m += parseFloat(fsProjections[y]);
                        }
                    else U = "";
                    if (includeSOS) {
                        var $ = 0,
                            H = "",
                            E = "<td class='oppRankNA mobile-hide'> </td>";
                        "OffPass" === playerPosType(y) && (($ = P), (H = "Opponent Rank Against the Pass")),
                            "OffRush" === playerPosType(y) && (($ = R), (H = "Opponent Rank Against the Run")),
                            "OffAvg" === playerPosType(y) && (($ = w), (H = "Opponent Defense Rank")),
                            "DefPass" === playerPosType(y) && (($ = k), (H = "Opponent Rank Passing")),
                            "DefRush" === playerPosType(y) && (($ = I), (H = "Opponent Rank Rushing")),
                            "DefAvg" === playerPosType(y) && (($ = T), (H = "Opponent Offense Rank")),
                            0 === $ && (E = "<td class='oppRankNA mobile-hide'> </td>"),
                            $ >= 1 && $ <= 6 && (E = "<td class='oppRankBadMatchup mobile-hide' title='" + H + " - BAD Matchup'> " + $ + " </td>"),
                            $ >= 7 && $ <= 12 && (E = "<td class='oppRankPoorMatchup mobile-hide' title='" + H + " - POOR Matchup'> " + $ + " </td>"),
                            $ >= 13 && $ <= 20 && (E = "<td class='oppRankAvgMatchup mobile-hide' title='" + H + " - NEUTRAL Matchup'> " + $ + " </td>"),
                            $ >= 21 && $ <= 26 && (E = "<td class='oppRankGoodMatchup mobile-hide' title='" + H + " - GOOD Matchup'> " + $ + " </td>"),
                            $ >= 27 && $ <= 32 && (E = "<td class='oppRankGreatMatchup mobile-hide' title='" + H + " - GREAT Matchup'> " + $ + " </td>");
                    } else E = "";
                    if (parseFloat(playerUpdates[0][y]) !== parseFloat(playerUpdates[1][y]))
                        if (parseFloat(playerUpdates[0][y]) > parseFloat(playerUpdates[1][y])) var O = "<img src='" + recentUpdateImage + "' alt='player has a recent point gain'  title='player has a recent point gain' />";
                        else O = "<img src='" + recentNegativeUpdateImage + "' alt='player has a recent point loss'  title='player has a recent point loss' />";
                    else O = "";
                    if ((MFLNoData && (O = ""), 2 === s)) var B = " showBench" + a + "' style='display:none'";
                    else B = "'";
                    var _ = " class='rowCurrentlyPlaying" + B;
                    0 === parseInt(S) && (_ = " class='rowGameOver" + B), 3600 === parseInt(S) && (_ = " class='rowYTP" + B);
                    try {
                        if (useNFLIconInPlayerTable)
                            var j = "<img src='" + nflLogoPath + MFLPlayerInfo[y].team + "." + nflLogoExt + "' title='" + getNFLFullName(MFLPlayerInfo[y].team) + "' class='nflicon' style='height:16px;vertical-align:middle' />";
                        else j = MFLPlayerInfo[y].team;
                        (p[h] = {
                            sortNumber: getPositionSortNumber(MFLPlayerInfo[y].position),
                            html:
                                "<tr" +
                                _ +
                                "><td class='MFLPlayerName'> <a href='" +
                                baseURLDynamic +
                                "/" +
                                year +
                                "/player?L=" +
                                league_id +
                                "&P=" +
                                y +
                                "' target='mflpage' class='position_" +
                                MFLPlayerInfo[y].position.toLowerCase() +
                                "'>" +
                                MFLPlayerInfo[y].name +
                                " " +
                                MFLPlayerInfo[y].team +
                                " " +
                                MFLPlayerInfo[y].position +
                                "</a>" +
                                b +
                                "</td><td class='hasball mobile-hide borderhide'>" +
                                O +
                                M +
                                " </td><td class='MFLPlayerGame mobile-hide' style='white-space:nowrap'> " +
                                j +
                                F +
                                "</td>" +
                                E +
                                "<td class='MFLGameClock'> " +
                                v +
                                "</td>" +
                                U +
                                "<td class='MFLPlayerPoints' rel='scoreboardTooltip' id='" +
                                y +
                                "_" +
                                a +
                                "_" +
                                MFLCurrentWeek +
                                "' hint='setup(\"" +
                                y +
                                '","' +
                                a +
                                '","' +
                                MFLCurrentWeek +
                                "\")'>" +
                                D +
                                " </td></tr>",
                        }),
                            h++;
                    } catch (e) {}
                }
                d = d.substring(d.indexOf(",") + 1, d.length);
            }
        } catch (e) {}
        if (p.length > 0) {
            if (((n = !0), p.sort(sortby("sortNumber")), 2 === s)) {
                var Y =
                        " <span id='hideBench" +
                        a +
                        "' style='display:none'>(<a href='#hidebench' onclick='$(\".showBench" +
                        a +
                        '").css("display","none");$("#showBench' +
                        a +
                        '").css("display","");$("#hideBench' +
                        a +
                        '").css("display","none");showBenchTracker["' +
                        a +
                        "\"]=false'>hide</a>)</span>",
                    G =
                        "<span class='showBench" +
                        a +
                        "' style='display:none'> Total</span> <span id='showBench" +
                        a +
                        "'>(<a href='#showbench' onclick='$(\".showBench" +
                        a +
                        '").css("display","");$("#showBench' +
                        a +
                        '").css("display","none");$("#hideBench' +
                        a +
                        '").css("display","");showBenchTracker["' +
                        a +
                        "\"]=true'>show</a>)</span>";
                _ = " showBench" + a + "' style='display:none'";
            } else (Y = ""), (G = " Total"), (_ = "'");
            var V = "",
                J = "";
            if (includeProjections) {
                if (MFLLiveMode) var z = "Pace";
                else z = "Proj";
                V = "<th class='lineupHeaderProj mobile-hide'>" + z + "</th>";
            }
            includeSOS && (J = "<th class='sos mobile-hide'>S.O.S</th>"),
                (o +=
                    "<tr class='lineupHeaderRow" +
                    _ +
                    "><th class='lineupHeaderPlayer'>" +
                    i +
                    Y +
                    "</th><th class='mobile-hide borderhide'></th><th class='lineupHeaderGames mobile-hide'>Games</th>" +
                    J +
                    "<th class='gamestime'>Time</th>" +
                    V +
                    "<th class='lineupHeaderActual'>Actual</th></tr>");
            for (var K = 0; K < p.length; K++) (p[K].html = K % 2 ? p[K].html.replace("<tr class='", "<tr class='eventablerow ") : p[K].html.replace("<tr class='", "<tr class='oddtablerow ")), (o += p[K].html);
            if (c) {
                var q = "",
                    Z = "";
                if (includeProjections)
                    if (MFLLiveMode) {
                        x = '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Pace vs Projection</span></caption><tbody>';
                        if (
                            ((x += '<tr class="oddtablerow"><td style="text-align:left;">Original Projection </td><td style="text-align:right">' + m.toFixed(precision) + "</td></tr>"),
                            (x += '<tr class="oddtablerow"><td style="text-align:left;">On Pace Projection </td><td style="text-align:right">' + f.toFixed(precision) + "</td></tr>"),
                            f > m)
                        )
                            W = '<span style="font-size:18px">+ </span>';
                        else if (f < m) W = '<span style="font-size:18px">- </span>';
                        else W = "";
                        (x += '<tr class="oddtablerow"><td style="text-align:left;font-weight:bold">Difference: </td><td style="text-align:right;font-weight:bold">' + W + Math.abs(f - m).toFixed(precision) + "</td></tr>"),
                            (q = "<th class='pointTotalProj mobile-hide' style='cursor:help' rel='scoreboardTooltip' hint='" + (x += "</tbody></table>") + "'>" + parseFloat(f).toFixed(precision) + " </th>");
                    } else q = "<th class='pointTotalProj mobile-hide'>" + m.toFixed(precision) + "</th>";
                includeSOS && (Z = "<th class='mobile-hide borderhide'></th>"),
                    (o +=
                        "<tr class='pointTotalRow'><th class='pointTotalTitle'>" +
                        i +
                        G +
                        "</th><th class='mobile-hide borderhide'></th><th class='mobile-hide borderhide'></th>" +
                        Z +
                        "<th class='borderhide'></th>" +
                        q +
                        "<th class='pointTotalActual'>" +
                        u.toFixed(precision) +
                        "</th></tr>");
            }
        }
    }
    return n || (o += "<tr><td><center><br><br>Weekly Lineup has not been set <br><br> OR <br><br> can not be viewed at this time.<br><br><br></center></td></tr>"), (o += "</tbody></table>");
}
function MFLPopulateNFLLineupTable(e, a) {
    var t = baseURLDynamic + "/" + year + "/pro_matchup?L=" + league_id + "&W=" + MFLCurrentWeek + "&MATCHUP=" + e,
        r = a[e].secondsRemaining,
        o = a[e].image,
        n = a[e].scoreClock,
        s = " class='rowCurrentlyPlaying'";
    0 === parseInt(r) && (s = " class='rowGameOver'"), 3600 === parseInt(r) && (s = " class='rowYTP'");
    var i = new Array(),
        l = "";
    l = "<table class='MFLTeamLineup report'><caption class='desktop-hide-caption'><span>" + getNFLFullName(e) + "</span></caption><tbody>";
    var c = "",
        d = "";
    if (includeProjections) {
        if (MFLLiveMode) var p = "Pace";
        else p = "Proj";
        c = "<th class='lineupHeaderProj mobile-hide'>" + p + "</th>";
    }
    includeSOS && (d = "<th class='sos mobile-hide'>S.O.S</th>"),
        (l +=
            "<tr class='lineupHeaderRow'><th class='lineupHeaderPlayer'>Player</th><th class='mobile-hide borderhide'></th><th class='lineupHeaderGames mobile-hide'>Fantasy Team</th>" +
            d +
            "<th class='gamestime'>Time</th>" +
            c +
            "<th class='lineupHeaderActual'>Actual</th></tr>");
    var h = new Array(),
        u = new Array();
    $.ajax({ type: "GET", url: t, async: !1, data: { USER_ID: userCookieValue } }).done(function (e) {
        $(e)
            .find(".report .nocaption")
            .each(function () {
                var e = new Array(),
                    t = 0,
                    r = $(this).find("tr:eq(0) th:eq(0)").text();
                $(this)
                    .find("tr:eq(1) th")
                    .each(function () {
                        t++;
                        var a = $(this).text();
                        "Fum Lost" === a && (a = "FL"), "Miss FG" === a && (a = "FGMi"), "Miss XP" === a && (a = "XPMi"), "Pass Def" === a && (a = "PD"), t > 1 && (e[e.length] = a);
                    });
                for (var l = 0; l < $(this).find("tr").length; l++) {
                    var c = $(this);
                    $(this)
                        .find("tr:eq(" + l + ') a[class^="position_"]')
                        .each(function () {
                            var t = $(this).attr("href"),
                                d = t.substring(t.indexOf("P=") + 2, t.length);
                            if (void 0 === h[d]) {
                                var p = i.length;
                                (h[d] = p), (u[d] = "");
                            } else p = h[d];
                            var m = $(c).find("tr:eq(" + l + ")");
                            if (isNaN(parseFloat($(m).find("td:eq(1)").text()))) var f = "-";
                            else f = parseFloat($(m).find("td:eq(1)").text()).toFixed(precision);
                            if (includeProjections)
                                if ((void 0 === fsProjections[d] && (fsProjections[d] = 0), MFLLiveMode)) {
                                    try {
                                        var y = parseInt(a[MFLPlayerInfo[d].team].secondsRemaining);
                                    } catch (e) {
                                        y = 0;
                                    }
                                    var g = (y / 3600) * parseFloat(fsProjections[d]),
                                        L = g + parseFloat(f),
                                        b = '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Pace Breakdown</span></caption><tbody>';
                                    if (
                                        ((b += '<tr><th colspan="2" style="font-weight:bold;text-align:left;">' + MFLPlayerInfo[d].name + " " + MFLPlayerInfo[d].team + " " + MFLPlayerInfo[d].position + "</th></tr>"),
                                        (b += '<tr class="oddtablerow"><td style="text-align:left;">  Seconds Remaining as % </td><td style="text-align:right">' + parseFloat((100 * y) / 3600).toFixed(1) + "%</td></tr>"),
                                        (b += '<tr class="oddtablerow"><td style="text-align:left;">  Original Projection </td><td style="text-align:right">' + parseFloat(fsProjections[d]).toFixed(precision) + "</td></tr>"),
                                        (b += '<tr class="oddtablerow"><td style="text-align:left;">  Remaining Projected Points </td><td style="text-align:right">' + parseFloat(g).toFixed(precision) + "</td></tr>"),
                                        (b += '<tr class="oddtablerow"><td style="text-align:left;">  Actual Points Scored </td><td style="text-align:right">' + validateAsNumber(f).toFixed(precision) + "</td></tr>"),
                                        (b +=
                                            '<tr class="oddtablerow"><td style="text-align:left;font-weight:bold">On Pace Points: </td><td style="text-align:right;font-weight:bold">' + validateAsNumber(L).toFixed(precision) + "</td></tr>"),
                                        validateAsNumber(L) > validateAsNumber(fsProjections[d]))
                                    )
                                        var F = '<span style="font-size:18px">+ </span>';
                                    else if (validateAsNumber(L) < validateAsNumber(fsProjections[d])) F = '<span style="font-size:18px">- </span>';
                                    else F = "";
                                    b +=
                                        '<tr class="oddtablerow"><td style="text-align:left;font-weight:bold">Difference: </td><td style="text-align:right;font-weight:bold">' +
                                        F +
                                        Math.abs(validateAsNumber(L) - validateAsNumber(fsProjections[d])).toFixed(precision) +
                                        "</td></tr>";
                                    var M = "<td class='MFLPlayerProjections mobile-hide' style='cursor:help' rel='scoreboardTooltip' hint='" + (b += "</tbody></table>") + "'>" + validateAsNumber(L).toFixed(precision) + " </td>";
                                } else if (void 0 === fsProjections[d]) M = "<td class='MFLPlayerProjections mobile-hide'>" + parseFloat(0).toFixed(precision) + " </td>";
                                else M = "<td class='MFLPlayerProjections mobile-hide'>" + parseFloat(fsProjections[d]).toFixed(precision) + " </td>";
                            else M = "";
                            if (includeSOS) {
                                var v = 0,
                                    S = "",
                                    k = "<td class='oppRankNA mobile-hide'> </td>";
                                "OffPass" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].passDefRank), (S = "Opponent Rank Against the Pass")),
                                    "OffRush" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].rushDefRank), (S = "Opponent Rank Against the Run")),
                                    "OffAvg" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].avgDefRank), (S = "Opponent Defense Rank")),
                                    "DefPass" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].passOffRank), (S = "Opponent Rank Passing")),
                                    "DefRush" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].rushOffRank), (S = "Opponent Rank Rushing")),
                                    "DefAvg" === playerPosType(d) && ((v = a[MFLPlayerInfo[d].team].avgOffRank), (S = "Opponent Offense Rank")),
                                    0 === v && (k = "<td class='oppRankNA mobile-hide'> </td>"),
                                    v >= 1 && v <= 6 && (k = "<td class='oppRankBadMatchup mobile-hide' title='" + S + " - BAD Matchup'> " + v + " </td>"),
                                    v >= 7 && v <= 12 && (k = "<td class='oppRankPoorMatchup mobile-hide' title='" + S + " - POOR Matchup'> " + v + " </td>"),
                                    v >= 13 && v <= 20 && (k = "<td class='oppRankAvgMatchup mobile-hide' title='" + S + " - NEUTRAL Matchup'> " + v + " </td>"),
                                    v >= 21 && v <= 26 && (k = "<td class='oppRankGoodMatchup mobile-hide' title='" + S + " - GOOD Matchup'> " + v + " </td>"),
                                    v >= 27 && v <= 32 && (k = "<td class='oppRankGreatMatchup mobile-hide' title='" + S + " - GREAT Matchup'> " + v + " </td>");
                            } else k = "";
                            try {
                                var I = " (<span class='warning injurystatus' title='" + MFLInjuryInfo[d].status + ": " + MFLInjuryInfo[d].details + "'>" + MFLInjuryInfo[d].code + "</span>)";
                            } catch (e) {
                                I = "";
                            }
                            if (parseFloat(playerUpdates[0][d]) !== parseFloat(playerUpdates[1][d]) && void 0 !== playerUpdates[0][d])
                                if (parseFloat(playerUpdates[0][d]) > parseFloat(playerUpdates[1][d])) var T = "<img src='" + recentUpdateImage + "' alt='player has a recent point gain'  title='player has a recent point gain' />";
                                else T = "<img src='" + recentNegativeUpdateImage + "' alt='player has a recent point loss'  title='player has a recent point loss' />";
                            else T = "";
                            MFLNoData && (T = ""),
                                (i[p] = new Array()),
                                (i[p].sortNumber = getPositionSortNumber(MFLPlayerInfo[d].position)),
                                (i[p].html =
                                    "<tr" +
                                    s +
                                    "><td class='MFLPlayerName'> <a href='" +
                                    baseURLDynamic +
                                    "/" +
                                    year +
                                    "/player?L=" +
                                    league_id +
                                    "&P=" +
                                    d +
                                    "' target='mflpage' class='position_" +
                                    MFLPlayerInfo[d].position.toLowerCase() +
                                    "'>" +
                                    MFLPlayerInfo[d].name +
                                    " " +
                                    MFLPlayerInfo[d].team +
                                    " " +
                                    MFLPlayerInfo[d].position +
                                    "</a>" +
                                    I +
                                    "</td>"),
                                (i[p].html += "<td class='hasball mobile-hide borderhide'>" + T + o + " </td>");
                            try {
                                (i[p].html += useMFLIconInPlayerTable
                                    ? "<td class='MFLPlayerFantasyTeam mobile-hide'><img src='" +
                                      franchiseDatabase["fid_" + MFLRosterInfo["pid_" + d][0].fid].icon +
                                      "' style='height:16px;vertical-align:middle' title='" +
                                      franchiseDatabase["fid_" + MFLRosterInfo["pid_" + d][0].fid].name +
                                      "' /></td>"
                                    : "<td class='MFLPlayerFantasyTeam mobile-hide'>" + franchiseDatabase["fid_" + MFLRosterInfo["pid_" + d][0].fid].name.substring(0, 15) + "</td>"),
                                    (i[p].notFA = !0);
                            } catch (e) {
                                (i[p].html += "<td class='MFLPlayerFantasyTeam mobile-hide'>FA</td>"), (i[p].notFA = !1);
                            }
                            (i[p].html += k),
                                (i[p].html += "<td class='MFLGameClock'> " + n + "</td>"),
                                (i[p].html += M),
                                (u[d] += '<table class="report" style="border-collapse:collapse; border:0px;"><tbody>'),
                                (u[d] += '<tr><th style="text-align:left;font-weight:bold">' + r + "</th>");
                            for (var P = 1; P < e.length; P++)
                                "Defense" === r
                                    ? "" !==
                                          $(m)
                                              .find("td:eq(" + (P + 1) + ")")
                                              .text() && (u[d] += '<th style="text-align:center;width:10%;white-space:nowrap"> ' + e[P] + " </th>")
                                    : (u[d] += '<th style="text-align:center;width:10%;white-space:nowrap"> ' + e[P] + " </th>");
                            u[d] += '</tr><tr class="oddtablerow"><td> </td>';
                            for (P = 2; P <= e.length; P++) {
                                if (
                                    "" ===
                                    $(m)
                                        .find("td:eq(" + P + ")")
                                        .text()
                                )
                                    var R = "-";
                                else
                                    R = $(m)
                                        .find("td:eq(" + P + ")")
                                        .text();
                                "Defense" === r
                                    ? "" !==
                                          $(m)
                                              .find("td:eq(" + P + ")")
                                              .text() && (u[d] += '<td style="text-align:center;">' + R + " </td>")
                                    : (u[d] += '<td style="text-align:center;">' + R + " </td>");
                            }
                            u[d] += "</tr></tbody></table>";
                            b = '<span id="MFLPlayerPopupClose">X</span><table class="MFLPlayerStatsPopup report"><caption><span style="white-space:nowrap; padding-right:10px">Stats Breakdown</span></caption><tbody>';
                            (b += '<tr class="oddtablerow"><td style="font-weight:bold;text-align:left;">' + MFLPlayerInfo[d].name + " " + MFLPlayerInfo[d].team + " " + MFLPlayerInfo[d].position + "</td></tr>"),
                                (b += '<tr class="oddtablerow"><td>' + u[d] + "</td></tr>"),
                                (b += "</tbody></table>"),
                                (i[p].html += "<td class='MFLPlayerPoints' rel='scoreboardTooltip' hint='" + b + "'>" + f + " </td>"),
                                (i[p].html += "</tr>"),
                                (i[p].pointsEarned = "-" !== f);
                        });
                }
            });
    }),
        i.sort(sortby("sortNumber"));
    for (var m = 0; m < i.length; m++)
        (i[m].html = m % 2 ? i[m].html.replace("<tr class='", "<tr class='eventablerow ") : i[m].html.replace("<tr class='", "<tr class='oddtablerow ")),
            (i[m].notFA || MFLNFLLineupIncludeFA) && (i[m].pointsEarned || MFLNFLLineupIncludeNotUsedPositions) && (l += i[m].html);
    return (l += "</tbody></table>");
}
function checkMFLMatchup() {
    matchupsDisplayedIsFantasy ? setMFLMatchup(currentGameHilighted) : setMFLNFLMatchup(currentNFLGameHilighted),
        -1 === currentNFLGameHilighted && ((currentNFLGameHilighted = 0), document.getElementById("matchupNFL_" + currentNFLGameHilighted).parentNode.setAttribute("class", "matchupHilite"));
}
function setMFLMatchup(e) {
    currentGameHilighted = e > MFLLiveScoringMatchups.length - 1 ? 0 : e;
    for (var a = 0; a < MFLLiveScoringMatchups.length; a++) document.getElementById("matchup_" + a).parentNode.setAttribute("class", "matchupLolite");
    document.getElementById("matchup_" + currentGameHilighted).parentNode.setAttribute("class", "matchupHilite"),
        (activeMFLRoadID = MFLLiveScoringMatchups[currentGameHilighted].road.fid),
        (activeMFLHomeID = MFLLiveScoringMatchups[currentGameHilighted].home.fid),
        (lastPlayerUpdate = 0),
        clearTimeout(myMainScoreboardTimer),
        (myLoopCount = 0),
        (mySecondsCount = 0),
        updateMFLMainScoreboard();
}
function setMFLNFLMatchup(e) {
    currentNFLGameHilighted = e > MFLNFLLiveScoringMatchups.length - 1 ? 0 : e;
    for (var a = 0; a < MFLNFLLiveScoringMatchups.length; a++) document.getElementById("matchupNFL_" + a).parentNode.setAttribute("class", "matchupLolite");
    document.getElementById("matchupNFL_" + currentNFLGameHilighted).parentNode.setAttribute("class", "matchupHilite"),
        (activeMFLNFLRoadID = MFLNFLLiveScoringMatchups[currentNFLGameHilighted].road.nflID),
        (activeMFLNFLHomeID = MFLNFLLiveScoringMatchups[currentNFLGameHilighted].home.nflID),
        (lastPlayerUpdate = 0),
        clearTimeout(myMainScoreboardTimer),
        (myLoopCount = 0),
        (mySecondsCount = 0),
        updateMFLMainScoreboard();
}
function startTheTimer() {
    if ((mySecondsCount++, 0 !== maxLoops && myLoopCount > maxLoops))
        $("#MFLRestartHolder").html("<span class='warning' onclick='checkMFLMatchup();$(\"#MFLRestartHolder\").hide()' style='cursor:pointer;font-weight:bold'>Live Updates Paused - Click to Restart</span>"), $("#MFLRestartHolder").show();
    else if (mySecondsCount > refreshSeconds) clearTimeout(myMainScoreboardTimer), (mySecondsCount = 0), updateMFLMainScoreboard(), myLoopCount++;
    else {
        var e = refreshSeconds - mySecondsCount;
        (e = e < 10 ? "00:0" + e : "00:" + e), (myMainScoreboardTimer = setTimeout("startTheTimer()", 1e3));
    }
}
function updateMFLMainScoreboard() {
    if (document.getElementById) {
        console.log("Updating Scoreboard . . . "),
            (nflSchedule = new Array()),
            $.ajax({ type: "GET", url: baseURLDynamic + "/" + year + "/export?TYPE=nflSchedule&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random(), async: !1, nflScheduleData: { USER_ID: userCookieValue } }).done(function (e) {
                (nflSchedule = getMFLNFLSchedule(e)), (e = null);
            });
        var e = new Array();
        MFLLiveMode && MFLCurrentWeek === liveScoringWeek
            ? $.ajax({
                  type: "GET",
                  url: baseURLDynamic + "/" + year + "/export?TYPE=liveScoring&L=" + league_id + "&W=" + MFLCurrentWeek + "&DETAILS=1&JSON=1&rand=" + Math.random(),
                  async: !1,
                  liveScoringResultsData: { USER_ID: userCookieValue },
              }).done(function (a) {
                  (rosterData = getMFLStartBenchFromAPI(a)), (e = getMFLLiveScoringResultsData(a, 1)), (a = null);
              })
            : $.ajax({
                  type: "GET",
                  url: baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random(),
                  async: !1,
                  liveScoringResultsData: { USER_ID: userCookieValue },
              }).done(function (a) {
                  (e = getMFLLiveScoringResultsData(a, 2)), (a = null);
              }),
            0 === lastPlayerUpdate
                ? ((playerUpdates[0] = e.playerInfo), (playerUpdates[1] = e.playerInfo), (lastPlayerUpdate = myTimestamp()))
                : parseFloat(myTimestamp() / 6e4) - parseFloat(lastPlayerUpdate / 6e4) > 0.5 && ((playerUpdates[1] = playerUpdates[0]), (playerUpdates[0] = e.playerInfo), (lastPlayerUpdate = myTimestamp()));
        for (var a = 1; a <= 64; a++)
            for (var t = 1; t <= MFLLeagueInfo.franchises; t++)
                try {
                    if (t < 10) var r = "000" + t;
                    else r = "00" + t;
                    var o = "fid_" + r + a;
                    !MFLLiveMode && MFLCurrentWeek > liveScoringWeek ? $("#" + o).html('<span style="font-size:smaller">' + MFLTeamWLT[r] + "</span>") : $("#" + o).html(parseFloat(e.teamInfo[r].score).toFixed(precision));
                    try {
                        if (MFLLiveMode && includeProjections && parseFloat(e.paceInfo[r]) > 0) $("#" + ("fidPace_" + r + a)).html(parseFloat(e.paceInfo[r]).toFixed(precision));
                    } catch (e) {}
                } catch (e) {}
        for (a = 1; a <= 64; a++)
            try {
                (r = "AVG"), (o = "fid_AVG" + a);
                $("#" + o).html(parseFloat(e.teamInfo[r].score).toFixed(precision));
            } catch (e) {}
        for (a = 0; a < e.gameInfo.length; a++)
            try {
                var n = parseInt(e.gameInfo[a].gameSecondsRemaining);
                if (allPlaySetup || tempAllPlayCheck) var s = a + 1;
                else s = e.gameInfo[a].gameIdRoad;
                var i = e.gameInfo[a].gameIdHome,
                    l = e.gameInfo[a].fidRoad,
                    c = e.gameInfo[a].fidHome,
                    d = parseFloat(e.gameInfo[a].scoreRoad),
                    p = parseFloat(e.gameInfo[a].scoreHome),
                    h = e.gameInfo[a].resultsRoad,
                    u = e.gameInfo[a].resultsHome,
                    m = "";
                "W" === h && "" === m && (m = "fidWin_" + l + s),
                    "W" === u && "" === m && (m = "fidWin_" + c + i),
                    d > p && 0 === n && "" === m && (m = "fidWin_" + l + s),
                    p > d && 0 === n && "" === m && (m = "fidWin_" + c + i),
                    "" !== m && $("#" + m).html("<"),
                    MFLLiveMode ||
                        MFLCurrentWeek !== liveScoringWeek + 1 ||
                        (parseFloat(e.gameInfo[a].spreadRoad) < 0 && $("#fidPace_" + l + s).html(parseFloat(e.gameInfo[a].spreadRoad).toFixed(precision)),
                        parseFloat(e.gameInfo[a].spreadHome) < 0 && $("#fidPace_" + c + i).html(parseFloat(e.gameInfo[a].spreadHome).toFixed(precision)));
            } catch (e) {}
        for (a = 0; a <= e.gameInfo.length; a++)
            try {
                var f = "cid_" + a,
                    y = "",
                    g = ((n = e.gameInfo[a].gameSecondsRemaining) / (2 * leagueAttributes.MaxStarters * 3600)) * 3600;
                MFLCurrentWeek > liveScoringWeek && (g = 3600);
                var L = parseInt(nflTeamUpdate[MFLCurrentWeek][0].kickoff);
                scoreboardFirstKickoff[e.gameInfo[a].fidRoad] > L &&
                    scoreboardFirstKickoff[e.gameInfo[a].fidHome] > L &&
                    (L = scoreboardFirstKickoff[e.gameInfo[a].fidRoad] < scoreboardFirstKickoff[e.gameInfo[a].fidHome] ? scoreboardFirstKickoff[e.gameInfo[a].fidRoad] : scoreboardFirstKickoff[e.gameInfo[a].fidHome]),
                    0 === parseInt(g) && (y = "Final"),
                    3600 === parseInt(g) && (y = MFLCurrentWeek === liveScoringWeek ? formatHabDate(new Date(1e3 * L), "ddd  h:mm") : formatHabDate(new Date(1e3 * L), "ddd  MM/d  h:mm")),
                    1800 === parseInt(g) && (y = "Half"),
                    parseInt(g) > 0 && parseInt(g) < 900 && (y = "4th - " + formatHabDate(new Date(1e3 * parseInt(g)), "m:ss")),
                    parseInt(g) >= 900 && parseInt(g) < 1800 && (y = "3rd - " + formatHabDate(new Date(1e3 * (parseInt(g) - 900)), "m:ss")),
                    parseInt(g) > 1800 && parseInt(g) < 2700 && (y = "2nd - " + formatHabDate(new Date(1e3 * (parseInt(g) - 1800)), "m:ss")),
                    parseInt(g) >= 2700 && parseInt(g) < 3600 && (y = "1st - " + formatHabDate(new Date(1e3 * (parseInt(g) - 2700)), "m:ss")),
                    0 === parseFloat(e.gameInfo[a].scoreRoad) &&
                        0 === parseFloat(e.gameInfo[a].scoreHome) &&
                        (y = MFLCurrentWeek === liveScoringWeek ? formatHabDate(new Date(1e3 * L), "ddd  h:mm") : formatHabDate(new Date(1e3 * L), "ddd  MM/d  h:mm")),
                    $("#" + f).html(y);
            } catch (e) {}
        var b = new Array(
            "ARI",
            "ATL",
            "BAL",
            "BUF",
            "CAR",
            "CHI",
            "CIN",
            "CLE",
            "DAL",
            "DEN",
            "DET",
            "GBP",
            "HOU",
            "IND",
            "JAC",
            "KCC",
            "LAC",
            "LAR",
            "MIA",
            "MIN",
            "NEP",
            "NOS",
            "NYG",
            "NYJ",
            "OAK",
            "PHI",
            "PIT",
            "SEA",
            "SFO",
            "TBB",
            "TEN",
            "WAS",
            "LVR",
            "RAM",
            "STL",
            "SDC"
        );
        for (a = 0; a < b.length; a++) {
            try {
                0 === validateAsNumber(nflSchedule[b[a]].secondsRemaining) &&
                    (validateAsNumber(nflSchedule[b[a]].ownScore) > 0 || validateAsNumber(nflSchedule[b[a]].oppScore) > 0) &&
                    validateAsNumber(nflSchedule[b[a]].ownScore) > validateAsNumber(nflSchedule[b[a]].oppScore) &&
                    $("#fidWin_" + b[a]).html("<");
            } catch (e) {}
            try {
                "" === nflSchedule[b[a]].ownScore
                    ? $("#fid_" + b[a]).html("")
                    : parseInt(nflSchedule[b[a]].ownScore) < 0
                    ? $("#fid_" + b[a]).html('<span class="MFLPaceScore MFLNFLSpread">' + validateAsNumber(nflSchedule[b[a]].ownScore) + "</span>")
                    : $("#fid_" + b[a]).html(validateAsNumber(nflSchedule[b[a]].ownScore));
            } catch (e) {}
            try {
                $("#nfl_" + b[a]).html(nflSchedule[b[a]].scoreClock);
            } catch (e) {}
        }
        if (
            ("" === scoreboardName
                ? $("#MFLCenterTop").html("<span class='hometeam'>HOME</span><span class='awayteam'>AWAY</span>" + MFLLeagueInfo.leagueName + " Scoreboard")
                : $("#MFLCenterTop").html("<span class='hometeam'>HOME</span><span class='awayteam'>AWAY</span>" + scoreboardName),
            matchupsDisplayedIsFantasy)
        ) {
            if ("BYE" === activeMFLRoadID) var F = "BYE";
            else if ("AVG" === activeMFLRoadID) F = "AVG";
            else F = franchiseDatabase["fid_" + activeMFLRoadID].name;
            if ("BYE" === activeMFLHomeID) var M = "BYE";
            else if ("AVG" === activeMFLHomeID) M = "AVG";
            else M = franchiseDatabase["fid_" + activeMFLHomeID].name;
            if (allPlaySetup || tempAllPlayCheck) var v = " onclick='swapAllPlayTeams();' style='cursor:pointer;' title='Swap Fantasy Teams'";
            else v = "";
            if (scoreboardRoadImageFlip) var S = " style='-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1);filter: FlipH;-ms-filter: \"FlipH\";'";
            else S = "";
            if (scoreboardHomeImageFlip) var k = " style='-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1);filter: FlipH;-ms-filter: \"FlipH\";'";
            else k = "";
            if ("" !== scoreboardIconBase && "" !== scoreboardIconExt)
                var I = "<img src='" + scoreboardIconBase + activeMFLRoadID + "." + scoreboardIconExt + "'" + S + " alt='" + F + "' title='" + F + "'" + v + " />",
                    T = "<img src='" + scoreboardIconBase + activeMFLHomeID + "." + scoreboardIconExt + "'" + k + " alt='" + M + "' title='" + M + "'" + v + " />";
            else if (scoreboardUseIcon)
                (I = "<img src='" + franchiseDatabase["fid_" + activeMFLRoadID].icon + "'" + S + " alt='" + F + "' title='" + F + "'" + v + " />"),
                    (T = "<img src='" + franchiseDatabase["fid_" + activeMFLHomeID].icon + "'" + k + " alt='" + M + "' title='" + M + "'" + v + " />");
            else if (scoreboardUseLogo)
                (I = "<img src='" + franchiseDatabase["fid_" + activeMFLRoadID].logo + "'" + S + " alt='" + F + "' title='" + F + "'" + v + " />"),
                    (T = "<img src='" + franchiseDatabase["fid_" + activeMFLHomeID].logo + "'" + k + " alt='" + M + "' title='" + M + "'" + v + " />");
            else if (scoreboardUseAbbrev)
                (I = "<div title='" + F + "'" + v + ">" + franchiseDatabase["fid_" + activeMFLRoadID].abbrev + "</div>"), (T = "<div title='" + M + "'" + v + ">" + franchiseDatabase["fid_" + activeMFLHomeID].abbrev + "</div>");
            else (I = "<div" + v + ">" + F + "</div>"), (T = "<div" + v + ">" + M + "</div>");
            if (
                ("AVG" === activeMFLRoadID ? $("#MFLRoadTeamName").html("League Avg") : $("#MFLRoadTeamName").html(I),
                "AVG" === activeMFLHomeID ? $("#MFLHomeTeamName").html("League Avg") : $("#MFLHomeTeamName").html(T),
                isNaN(parseFloat(e.teamInfo[activeMFLRoadID].score)))
            )
                var P = convertScore((0).toFixed(precision), !0);
            else P = convertScore(parseFloat(e.teamInfo[activeMFLRoadID].score).toFixed(precision), !0);
            if (isNaN(parseFloat(e.teamInfo[activeMFLHomeID].score))) var R = convertScore((0).toFixed(precision), !0);
            else R = convertScore(parseFloat(e.teamInfo[activeMFLHomeID].score).toFixed(precision), !0);
            $("#MFLRoadScore").html(P),
                $("#MFLHomeScore").html(R),
                $("#MFLRoadTeamRecord").html(MFLTeamWLT[activeMFLRoadID]),
                $("#MFLHomeTeamRecord").html(MFLTeamWLT[activeMFLHomeID]),
                $("#MFLRoadPlayers").html(e.teamInfo[activeMFLRoadID].playersCurrentlyPlaying),
                $("#MFLHomePlayers").html(e.teamInfo[activeMFLHomeID].playersCurrentlyPlaying),
                $("#MFLRoadPMR").html(parseInt(e.teamInfo[activeMFLRoadID].gameSecondsRemaining / 60)),
                $("#MFLHomePMR").html(parseInt(e.teamInfo[activeMFLHomeID].gameSecondsRemaining / 60)),
                $("#MFLRoadYTP").html(e.teamInfo[activeMFLRoadID].playersYetToPlay),
                $("#MFLHomeYTP").html(e.teamInfo[activeMFLHomeID].playersYetToPlay),
                $("#MFLScoreboardRoadLineup").html(MFLPopulateLineupTable(e, activeMFLRoadID, nflSchedule)),
                $("#MFLScoreboardHomeLineup").html(MFLPopulateLineupTable(e, activeMFLHomeID, nflSchedule)),
                showBenchTracker[activeMFLRoadID]
                    ? ($(".showBench" + activeMFLRoadID).css("display", ""), $("#showBench" + activeMFLRoadID).css("display", "none"), $("#hideBench" + activeMFLRoadID).css("display", ""))
                    : ($(".showBench" + activeMFLRoadID).css("display", "none"), $("#showBench" + activeMFLRoadID).css("display", ""), $("#hideBench" + activeMFLRoadID).css("display", "none")),
                showBenchTracker[activeMFLHomeID]
                    ? ($(".showBench" + activeMFLHomeID).css("display", ""), $("#showBench" + activeMFLHomeID).css("display", "none"), $("#hideBench" + activeMFLHomeID).css("display", ""))
                    : ($(".showBench" + activeMFLHomeID).css("display", "none"), $("#showBench" + activeMFLHomeID).css("display", ""), $("#hideBench" + activeMFLHomeID).css("display", "none"));
        } else {
            if (scoreboardUseIcon || scoreboardUseLogo)
                (I = "<table style='text-align:center; display:inline-table; border-collapse:collapse'><tr><td><img src='" + nflLogoPath + activeMFLNFLRoadID + "." + nflLogoExt + "' class='nflicon' /></td></tr></table>"),
                    (T = "<table style='text-align:center; display:inline-table; border-collapse:collapse'><tr><td><img src='" + nflLogoPath + activeMFLNFLHomeID + "." + nflLogoExt + "' class='nflicon' /></td></tr></table>");
            else if (scoreboardUseAbbrev) (I = "<div title='" + getNFLFullName(activeMFLNFLRoadID) + "'>" + activeMFLNFLRoadID + "</div>"), (T = "<div title='" + getNFLFullName(activeMFLNFLHomeID) + "'>" + activeMFLNFLHomeID + "</div>");
            else (I = "<div>" + getNFLFullName(activeMFLNFLRoadID) + "</div>"), (T = "<div>" + getNFLFullName(activeMFLNFLHomeID) + "</div>");
            $("#MFLRoadTeamName").html(I), $("#MFLHomeTeamName").html(T);
            (P = convertScore(validateAsNumber(nflSchedule[activeMFLNFLRoadID].ownScore).toFixed(0), !1)), (R = convertScore(validateAsNumber(nflSchedule[activeMFLNFLHomeID].ownScore).toFixed(0), !1));
            $("#MFLRoadScore").html(P), $("#MFLHomeScore").html(R);
            try {
                $("#MFLRoadTeamRecord").html("(" + MFLNFLTeamWLT[activeMFLNFLRoadID].win + "-" + MFLNFLTeamWLT[activeMFLNFLRoadID].loss + "-" + MFLNFLTeamWLT[activeMFLNFLRoadID].tie + ")");
            } catch (e) {
                $("#MFLRoadTeamRecord").html("(0-0-0)");
            }
            try {
                $("#MFLHomeTeamRecord").html("(" + MFLNFLTeamWLT[activeMFLNFLHomeID].win + "-" + MFLNFLTeamWLT[activeMFLNFLHomeID].loss + "-" + MFLNFLTeamWLT[activeMFLNFLHomeID].tie + ")");
            } catch (e) {
                $("#MFLHomeTeamRecord").html("(0-0-0)");
            }
            $("#MFLRoadPlayers").html("-"),
                $("#MFLHomePlayers").html("-"),
                $("#MFLRoadPMR").html("-"),
                $("#MFLHomePMR").html("-"),
                $("#MFLRoadYTP").html("-"),
                $("#MFLHomeYTP").html("-"),
                $("#MFLScoreboardRoadLineup").html(MFLPopulateNFLLineupTable(activeMFLNFLRoadID, nflSchedule)),
                $("#MFLScoreboardHomeLineup").html(MFLPopulateNFLLineupTable(activeMFLNFLHomeID, nflSchedule));
        }
        setMatchupsToDisplay(!1);
    }
    MFLCurrentWeek < liveScoringWeek || MFLCurrentWeek > liveScoringWeek || startTheTimer(),
        includeLoadingScreen ? doScoreboardLoadingScreenRemove() : $("#outerMFLScoreboardDiv").attr("style", "visibility:visible"),
        scoreboardFirstUpdate && (doScoreboardLoadingScreenRemove(), (scoreboardFirstUpdate = !1));
    try {
        MFLPlayerPopupNewsIcon("outerMFLScoreboardDiv");
    } catch (e) {}
    bindTooltip();
}
function updateCurrentWeekSetup(e) {
    (MFLCurrentWeek = parseInt(e)),
        matchupsDisplayedIsFantasy
            ? $("#MFLBoxHolder").html("<div id='MFLFantasyMatchupsUpdate' class='report'>Populating Week " + MFLCurrentWeek + " . . . Please Wait</div>")
            : $("#MFLBoxHolder").html("<div id='MFLNFLMatchupsUpdate' class='report'>Populating Week " + MFLCurrentWeek + " . . . Please Wait</div>"),
        (MFLLiveMode = MFLCurrentWeek === liveScoringWeek && liveScoringWeek !== completedWeek),
        setTimeout("updateCurrentWeek()", 100);
}
function updateCurrentWeek() {
    includeProjections &&
        $.ajax({ type: "GET", url: baseURLDynamic + "/" + year + "/export?TYPE=projectedScores&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1", async: !1, projectionsData: { USER_ID: userCookieValue } }).done(function (e) {
            for (var a = 0; a < e.projectedScores.playerScore.length; a++)
                0 === e.projectedScores.playerScore[a].score.length ? (fsProjections[e.projectedScores.playerScore[a].id] = 0) : (fsProjections[e.projectedScores.playerScore[a].id] = e.projectedScores.playerScore[a].score);
            e = null;
        });
    var e = createBoxScoreTables(),
        a = createNFLBoxScoreTables();
    if (
        (matchupsDisplayedIsFantasy
            ? $("#MFLBoxHolder").html("<div id='MFLFantasyMatchups' class='report'>" + e + "</div><div id='MFLNFLMatchups' class='report' style='display:none'>" + a + "</div>")
            : $("#MFLBoxHolder").html("<div id='MFLFantasyMatchups' class='report' style='display:none'>" + e + "</div><div id='MFLNFLMatchups' class='report'>" + a + "</div>"),
        $("#myNavigationHolder").html(createWeeklyNavigation()),
        MFLLiveMode)
    )
        var t = baseURLDynamic + "/" + year + "/export?TYPE=liveScoring&L=" + league_id + "&W=" + MFLCurrentWeek + "&DETAILS=1&JSON=1&rand=" + Math.random();
    else t = baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random();
    $.ajax({ type: "GET", url: t, async: !1, apiResults: { USER_ID: userCookieValue } }).done(function (e) {
        (rosterData = getMFLStartBenchFromAPI(e)), (e = null);
    }),
        (currentNFLGameHilighted = 0),
        checkMFLMatchup();
}
function doScoreboardLoadingScreen() {
    $("body").append("<div id='MFLScoreboardOverlay'></div>"),
        $("body").append("<div id='MFLScoreboardContainer'></div>"),
        $("#MFLScoreboardContainer").append("<div id='MFLScoreboardLoading'><center><h3>Populating Scoreboard . . .</h3><br><br><div class='MFLPlayerPopupLoader'></div><br><br></h3></center></div>"),
        $("#MFLScoreboardContainer").css({ "margin-left": "-" + $("#MFLScoreboardContainer").width() / 2 + "px", "margin-top": "-" + $("#MFLScoreboardContainer").height() / 2 + "px" }),
        $("#MFLScoreboardContainer").MFLpopCenter(!1),
        $("#MFLScoreboardContainer").wrapInner("<div class='report'></div>"),
        $("#MFLScoreboardOverlay").show(),
        $("#MFLScoreboardContainer").show(),
        $("#MFLScoreboardLoading").show();
}
function doScoreboardLoadingScreenRemove() {
    $("#MFLScoreboardContainer").remove(), $("#MFLScoreboardOverlay").remove(), $("#outerMFLScoreboardDiv").attr("style", "visibility:visible"), (includeLoadingScreen = !1);
}
function getTeamName(e) {
    if ("BYE" === e) return { name: "BYE", abbrev: "BYE", title: " title='BYE WEEK TEAM'" };
    if ("AVG" === e) return { name: "AVG", abbrev: "AVG", title: " title='LEAGUE AVG TEAM'" };
    if ("" === franchiseDatabase["fid_" + e].abbrev) var a = franchiseDatabase["fid_" + e].name;
    else a = franchiseDatabase["fid_" + e].abbrev;
    return { name: franchiseDatabase["fid_" + e].name, abbrev: a, title: " title='" + formatEscapeCharacter(franchiseDatabase["fid_" + e].name) + "'" };
}
function formatEscapeCharacter(e) {
    return e.replace(/'/g, "'");
}
function validateAsNumber(e) {
    var a = parseFloat(e);
    return isNaN(a) ? 0 : a;
}
function formatHabDate(e, a, t) {
    var r = ["\0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        o = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        n = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        s = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function i(e, a) {
        var t = e + "";
        for (a = a || 2; t.length < a; ) t = "0" + t;
        return t;
    }
    var l = t ? e.getUTCFullYear() : e.getFullYear();
    a = (a = (a = a.replace(/(^|[^\\])yyyy+/g, "$1" + l)).replace(/(^|[^\\])yy/g, "$1" + l.toString().substr(2, 2))).replace(/(^|[^\\])y/g, "$1" + l);
    var c = (t ? e.getUTCMonth() : e.getMonth()) + 1;
    a = (a = (a = (a = a.replace(/(^|[^\\])MMMM+/g, "$1" + r[0])).replace(/(^|[^\\])MMM/g, "$1" + o[0])).replace(/(^|[^\\])MM/g, "$1" + i(c))).replace(/(^|[^\\])M/g, "$1" + c);
    var d = t ? e.getUTCDate() : e.getDate();
    a = (a = (a = (a = a.replace(/(^|[^\\])dddd+/g, "$1" + n[0])).replace(/(^|[^\\])ddd/g, "$1" + s[0])).replace(/(^|[^\\])dd/g, "$1" + i(d))).replace(/(^|[^\\])d/g, "$1" + d);
    var p = t ? e.getUTCHours() : e.getHours(),
        h = p > 12 ? p - 12 : 0 === p ? 12 : p;
    a = (a = (a = (a = a.replace(/(^|[^\\])HH+/g, "$1" + i(p))).replace(/(^|[^\\])H/g, "$1" + p)).replace(/(^|[^\\])hh+/g, "$1" + i(h))).replace(/(^|[^\\])h/g, "$1" + h);
    var u = t ? e.getUTCMinutes() : e.getMinutes();
    a = (a = a.replace(/(^|[^\\])mm+/g, "$1" + i(u))).replace(/(^|[^\\])m/g, "$1" + u);
    var m = t ? e.getUTCSeconds() : e.getSeconds();
    a = (a = a.replace(/(^|[^\\])ss+/g, "$1" + i(m))).replace(/(^|[^\\])s/g, "$1" + m);
    var f = t ? e.getUTCMilliseconds() : e.getMilliseconds();
    (a = a.replace(/(^|[^\\])fff+/g, "$1" + i(f, 3))), (f = Math.round(f / 10)), (a = a.replace(/(^|[^\\])ff/g, "$1" + i(f))), (f = Math.round(f / 10));
    var y = p < 12 ? "AM" : "PM";
    a = (a = (a = a.replace(/(^|[^\\])f/g, "$1" + f)).replace(/(^|[^\\])TT+/g, "$1" + y)).replace(/(^|[^\\])T/g, "$1" + y.charAt(0));
    var g = y.toLowerCase();
    a = (a = a.replace(/(^|[^\\])tt+/g, "$1" + g)).replace(/(^|[^\\])t/g, "$1" + g.charAt(0));
    var L = -e.getTimezoneOffset(),
        b = t || !L ? "Z" : L > 0 ? "+" : "-";
    if (!t) {
        var F = (L = Math.abs(L)) % 60;
        b += i(Math.floor(L / 60)) + ":" + i(F);
    }
    a = a.replace(/(^|[^\\])K/g, "$1" + b);
    var M = (t ? e.getUTCDay() : e.getDay()) + 1;
    return (a = (a = (a = (a = (a = a.replace(new RegExp(n[0], "g"), n[M])).replace(new RegExp(s[0], "g"), s[M])).replace(new RegExp(r[0], "g"), r[c])).replace(new RegExp(o[0], "g"), o[c])).replace(/\\(.)/g, "$1"));
}
function reloadThisPage() {
    setTimeout("window.location.reload()", 1e3);
}
function checkIframeContents() {
    myIframeInnerHTML.indexOf("Lineup Not Accepted!") > 0 && alert("Uh Oh! Your submission appears to not have been valid.\n\nTry Again.\n\nIf you continue to have problems use the normal lineup submission form!");
}
function setMatchupsToDisplay(e) {
    try {
        e && (matchupsDisplayedIsFantasy = !matchupsDisplayedIsFantasy),
            matchupsDisplayedIsFantasy
                ? ((document.getElementById("MFLFantasyMatchups").style.display = "inline-block"),
                  (document.getElementById("MFLNFLMatchups").style.display = "none"),
                  $("#scoreboardHeader").html("Display: <a>Fantasy Scores</a> | <a href='#nflscoreboard' onclick='setMatchupsToDisplay(true);'>NFL Scores</a>"))
                : ((document.getElementById("MFLFantasyMatchups").style.display = "none"),
                  (document.getElementById("MFLNFLMatchups").style.display = "inline-block"),
                  $("#scoreboardHeader").html("Display: <a href='#fantasyscoreboard' onclick='setMatchupsToDisplay(true);'>Fantasy Scores</a> | <a>NFL Scores</a>")),
            e && checkMFLMatchup();
    } catch (e) {}
}
function getNFLFullName(e) {
    switch (e) {
        case "ARI":
            return "Arizona Cardinals";
        case "ATL":
            return "Atlanta Falcons";
        case "BAL":
            return "Baltimore Ravens";
        case "BUF":
            return "Buffalo Bills";
        case "CAR":
            return "Carolina Panthers";
        case "CHI":
            return "Chicago Bears";
        case "CIN":
            return "Cincinnati Bengals";
        case "CLE":
            return "Cleveland Browns";
        case "DAL":
            return "Dallas Cowboys";
        case "DEN":
            return "Denver Broncos";
        case "DET":
            return "Detroit Lions";
        case "GBP":
            return "Green Bay Packers";
        case "HOU":
            return "Houston Texans";
        case "IND":
            return "Indianapolis Colts";
        case "JAC":
            return "Jacksonville Jaguars";
        case "KCC":
            return "Kansas City Chiefs";
        case "LAC":
            return "Los Angeles Chargers";
        case "LAR":
            return "Los Angeles Rams";
        case "LVR":
            return "Las Vegas Raiders";
        case "MIA":
            return "Miami Dolphins";
        case "MIN":
            return "Minnesota Vikings";
        case "NEP":
            return "New England Patriots";
        case "NOS":
            return "New Orleans Saints";
        case "NYG":
            return "New York Giants";
        case "NYJ":
            return "New York Jets";
        case "PHI":
            return "Philadelphia Eagles";
        case "PIT":
            return "Pittsburgh Steelers";
        case "SEA":
            return "Seattle Seahawks";
        case "SFO":
            return "San Francisco 49ers";
        case "TBB":
            return "Tampa Bay Buccaneers";
        case "TEN":
            return "Tennessee Titans";
        case "WAS":
            return "Washington Redskins";
        case "OAK":
            return "Oakland Raiders";
        case "RAM":
            return "Los Angeles Rams";
        case "STL":
            return "St. Louis Rams";
        case "SDC":
            return "San Diego Chargers";
        default:
            return "";
    }
}
function getNFLTeamIdFromNickname(e) {
    switch (e) {
        case "Cardinals":
            return "ARI";
        case "Falcons":
            return "ATL";
        case "Ravens":
            return "BAL";
        case "Bills":
            return "BUF";
        case "Panthers":
            return "CAR";
        case "Bears":
            return "CHI";
        case "Bengals":
            return "CIN";
        case "Browns":
            return "CLE";
        case "Cowboys":
            return "DAL";
        case "Broncos":
            return "DEN";
        case "Lions":
            return "DET";
        case "Packers":
            return "GBP";
        case "Texans":
            return "HOU";
        case "Colts":
            return "IND";
        case "Jaguars":
            return "JAC";
        case "Chiefs":
            return "KCC";
        case "Chargers":
            return "LAC";
        case "Rams":
            return "LAR";
        case "Raiders":
            return "LVR";
        case "Dolphins":
            return "MIA";
        case "Vikings":
            return "MIN";
        case "Patriots":
            return "NEP";
        case "Saints":
            return "NOS";
        case "Giants":
            return "NYG";
        case "Jets":
            return "NYJ";
        case "Eagles":
            return "PHI";
        case "Steelers":
            return "PIT";
        case "Seahawks":
            return "SEA";
        case "49ers":
            return "SFO";
        case "Buccaneers":
            return "TBB";
        case "Titans":
            return "TEN";
        case "Redskins":
            return "WAS";
        default:
            return e;
    }
}
function getPositionSortNumber(e) {
    switch (e) {
        case "Coach":
            var a = 1;
            break;
        case "QB":
            a = 2;
            break;
        case "TMQB":
            a = 3;
            break;
        case "RB":
            a = 4;
            break;
        case "TMRB":
            a = 5;
            break;
        case "FB":
            a = 6;
            break;
        case "WR":
            a = 7;
            break;
        case "TMWR":
            a = 8;
            break;
        case "TE":
            a = 9;
            break;
        case "TMTE":
            a = 10;
            break;
        case "KR":
            a = 11;
            break;
        case "PK":
            a = 12;
            break;
        case "TMPK":
            a = 13;
            break;
        case "PN":
            a = 14;
            break;
        case "TMPN":
            a = 15;
            break;
        case "DE":
            a = 16;
            break;
        case "DT":
            a = 17;
            break;
        case "TMDL":
            a = 18;
            break;
        case "LB":
            a = 19;
            break;
        case "TMLB":
            a = 20;
            break;
        case "CB":
            a = 21;
            break;
        case "S":
            a = 22;
            break;
        case "TMDB":
            a = 23;
            break;
        case "Off":
            a = 24;
            break;
        case "Def":
            a = 25;
            break;
        case "ST":
            a = 26;
            break;
        default:
            a = 99;
    }
    return a;
}
function sortby(e) {
    return function (a, t) {
        return (a = parseFloat(a[e])), (t = parseFloat(t[e])), "number" == typeof a ? a - t : a === t ? 0 : a < t ? -1 : 1;
    };
}
function convertScore(e, a) {
    var t = "",
        r = e;
    !a && parseInt(r) < 0 && (r = "0");
    for (var o = 0; o < r.length; o++) t += "<span><a>" + r.substring(o, o + 1) + "</a></span>";
    for (o = 0; o < 8 - r.length; o++) t = "<span class='blank'><a></a></span>" + t;
    return "<div>" + t + "</div>";
}
function playerPosType(e) {
    var a = "na";
    try {
        ("QB" !== MFLPlayerInfo[e].position && "WR" !== MFLPlayerInfo[e].position && "TE" !== MFLPlayerInfo[e].position && "TMQB" !== MFLPlayerInfo[e].position && "TMTE" !== MFLPlayerInfo[e].position) || (a = "OffPass"),
            "RB" === MFLPlayerInfo[e].position && (a = "OffRush"),
            ("PK" !== MFLPlayerInfo[e].position &&
                "PN" !== MFLPlayerInfo[e].position &&
                "TMPK" !== MFLPlayerInfo[e].position &&
                "TMPN" !== MFLPlayerInfo[e].position &&
                "Coach" !== MFLPlayerInfo[e].position &&
                "ST" !== MFLPlayerInfo[e].position &&
                "Off" !== MFLPlayerInfo[e].position) ||
                (a = "OffAvg"),
            ("DE" !== MFLPlayerInfo[e].position &&
                "DT" !== MFLPlayerInfo[e].position &&
                "TMDL" !== MFLPlayerInfo[e].position &&
                "LB" !== MFLPlayerInfo[e].position &&
                "TMLB" !== MFLPlayerInfo[e].position &&
                "CB" !== MFLPlayerInfo[e].position &&
                "S" !== MFLPlayerInfo[e].position &&
                "TMDB" !== MFLPlayerInfo[e].position &&
                "Def" !== MFLPlayerInfo[e].position) ||
                (a = "DefAvg");
    } catch (e) {}
    return a;
}
function setupDoubleHeaderArray() {
    for (var e = 1; e <= MFLLeagueInfo.franchises; e++) {
        if (e < 10) var a = "000" + e;
        else a = "00" + e;
        doubleHeader[a] = 0;
    }
    doubleHeader.AVG = 0;
}
function swapAllPlayTeams() {
    (currentAllPlayTeam = activeMFLHomeID), (activeMFLHomeID = activeMFLRoadID), (activeMFLRoadID = currentAllPlayTeam), updateCurrentWeekSetup(MFLCurrentWeek);
}
function myTimestamp() {
    return new Date().getTime();
}
function getMFLCookieValue(e) {
    e += "=";
    for (var a = document.cookie.split(";"), t = 0; t < a.length; t++) {
        var r = a[t].trim();
        if (0 === r.indexOf(e)) return r.substring(e.length, r.length);
    }
    return "";
}
function disableEnterKey(e) {
    return 13 !== (window.event ? window.event.keyCode : e.which);
}
function initialJSONCalls() {
    var e = baseURLDynamic + "/" + year + "/export?TYPE=standings&L=" + league_id + "&JSON=1&rand=" + Math.random();
    if (
        ($.ajax({ type: "GET", url: e, standingsData: { USER_ID: userCookieValue } }).done(function (e) {
            for (var a = 0; a < e.standings.franchise.length; a++)
                try {
                    MFLTeamWLT[e.standings.franchise[a].id] = "(" + e.standings.franchise[a].h2hw.$t + "-" + e.standings.franchise[a].h2hl.$t + "-" + e.standings.franchise[a].h2ht.$t + ")";
                } catch (t) {
                    try {
                        MFLTeamWLT[e.standings.franchise[a].id] = "(" + e.standings.franchise[a].h2hw.$t + "-" + e.standings.franchise[a].h2hl.$t + ")";
                    } catch (t) {
                        MFLTeamWLT[e.standings.franchise[a].id] = "(0-0-0)";
                    }
                }
            (e = null), (scoreboardTracker[0] = !0), initialHTMLSetup();
        }),
        includeCustomPlayers)
    )
        e = baseURLDynamic + "/" + year + "/export?TYPE=players&L=" + league_id + "&JSON=1&rand=" + Math.random();
    else e = baseURLDynamic + "/" + year + "/export?TYPE=players&JSON=1&rand=" + Math.random();
    if (
        ($.ajax({ type: "GET", url: e, playerData: { USER_ID: userCookieValue } }).done(function (e) {
            for (var a = 0; a < e.players.player.length; a++) MFLPlayerInfo[e.players.player[a].id] = { name: e.players.player[a].name.replace(/'/g, ""), team: e.players.player[a].team, position: e.players.player[a].position };
            (e = null), (scoreboardTracker[1] = !0), initialHTMLSetup();
        }),
        0 === liveScoringWeek)
    )
        var a = 1;
    else a = liveScoringWeek;
    e = baseURLDynamic + "/" + year + "/export?TYPE=injuries&W=" + a + "&JSON=1&rand=" + Math.random();
    if (
        ($.ajax({ type: "GET", url: e, injuryData: { USER_ID: userCookieValue } }).done(function (e) {
            try {
                for (var a = 0; a < e.injuries.injury.length; a++) {
                    if ("I" === e.injuries.injury[a].status.substring(0, 1)) var t = "IR";
                    else t = e.injuries.injury[a].status.substring(0, 1);
                    MFLInjuryInfo[e.injuries.injury[a].id] = { code: t, status: e.injuries.injury[a].status, details: formatEscapeCharacter(e.injuries.injury[a].details) };
                }
            } catch (e) {}
            (e = null), (scoreboardTracker[2] = !0), initialHTMLSetup();
        }),
        0 === completedWeek)
    ) {
        e = baseURLDynamic + "/" + year + "/export?TYPE=nflSchedule&W=1&JSON=1&rand=" + Math.random();
        $.ajax({ type: "GET", url: e, nflScheduleData: { USER_ID: userCookieValue } }).done(function (e) {
            for (var a = 0; a < e.nflSchedule.matchup.length; a++) (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id] = { win: 0, loss: 0, tie: 0 }), (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id] = { win: 0, loss: 0, tie: 0 });
        }),
            (nflScheduleData = null),
            (scoreboardTracker[3] = !0),
            initialHTMLSetup();
    } else {
        if (completedWeek > 17) a = 17;
        else a = completedWeek;
        for (var t = 1; t <= a; t++) {
            e = baseURLDynamic + "/" + year + "/export?TYPE=nflSchedule&W=" + t + "&JSON=1&rand=" + Math.random();
            $.ajax({ type: "GET", url: e, nflScheduleData: { USER_ID: userCookieValue } }).done(function (e) {
                for (var a = 0; a < e.nflSchedule.matchup.length; a++)
                    void 0 === MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id] && (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id] = { win: 0, loss: 0, tie: 0 }),
                        void 0 === MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id] && (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id] = { win: 0, loss: 0, tie: 0 }),
                        validateAsNumber(e.nflSchedule.matchup[a].team[0].score) > validateAsNumber(e.nflSchedule.matchup[a].team[1].score)
                            ? (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id].win++, MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id].loss++)
                            : validateAsNumber(e.nflSchedule.matchup[a].team[0].score) < validateAsNumber(e.nflSchedule.matchup[a].team[1].score)
                            ? (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id].loss++, MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id].win++)
                            : (MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[0].id].tie++, MFLNFLTeamWLT[e.nflSchedule.matchup[a].team[1].id].tie++);
            }),
                (nflScheduleData = null),
                t === a && ((scoreboardTracker[3] = !0), initialHTMLSetup());
        }
    }
    e = baseURLDynamic + "/" + year + "/export?TYPE=rosters&L=" + league_id + "&JSON=1&rand=" + Math.random();
    $.ajax({ type: "GET", url: e, rostersData: { USER_ID: userCookieValue } }).done(function (e) {
        for (var a = 0; a < e.rosters.franchise.length; a++)
            if (void 0 === e.rosters.franchise[a].player);
            else if (void 0 === e.rosters.franchise[a].player.length) {
                var t = e.rosters.franchise[a].player.status;
                try {
                    var r = t;
                    if (("ROSTER" === t && (r = "Roster"), "TAXI_SQUAD" === t && (r = "Taxi Squad"), "INJURED_RESERVE" === t && (r = "IR"), "Roster" === r)) var o = "Bench";
                    else o = r;
                    void 0 === MFLRosterInfo["pid_" + e.rosters.franchise[a].player.id] && (MFLRosterInfo["pid_" + e.rosters.franchise[a].player.id] = new Array()),
                        (MFLRosterInfo["pid_" + e.rosters.franchise[a].player.id][MFLRosterInfo["pid_" + e.rosters.franchise[a].player.id].length] = {
                            pid: e.rosters.franchise[a].player.id,
                            fid: e.rosters.franchise[a].id,
                            rosterStatus: r,
                            playingStatus: o,
                            fidOriginal: e.rosters.franchise[a].id,
                            rosterStatusOriginal: r,
                        });
                } catch (e) {}
            } else
                for (var n = 0; n < e.rosters.franchise[a].player.length; n++) {
                    t = e.rosters.franchise[a].player[n].status;
                    try {
                        r = t;
                        if (("ROSTER" === t && (r = "Roster"), "TAXI_SQUAD" === t && (r = "Taxi Squad"), "INJURED_RESERVE" === t && (r = "IR"), "Roster" === r)) o = "Bench";
                        else o = r;
                        void 0 === MFLRosterInfo["pid_" + e.rosters.franchise[a].player[n].id] && (MFLRosterInfo["pid_" + e.rosters.franchise[a].player[n].id] = new Array()),
                            (MFLRosterInfo["pid_" + e.rosters.franchise[a].player[n].id][MFLRosterInfo["pid_" + e.rosters.franchise[a].player[n].id].length] = {
                                pid: e.rosters.franchise[a].player[n].id,
                                fid: e.rosters.franchise[a].id,
                                rosterStatus: r,
                                playingStatus: o,
                                fidOriginal: e.rosters.franchise[a].id,
                                rosterStatusOriginal: r,
                            });
                    } catch (e) {}
                }
        (e = null), (scoreboardTracker[4] = !0), initialHTMLSetup();
    });
    e = baseURLDynamic + "/" + year + "/export?TYPE=league&L=" + league_id + "&JSON=1&rand=" + Math.random();
    $.ajax({ type: "GET", url: e, leagueData: { USER_ID: userCookieValue } }).done(function (e) {
        (MFLLeagueInfo.leagueName = e.league.name),
            (MFLLeagueInfo.precision = e.league.precision),
            (MFLLeagueInfo.commishFid = "0001"),
            (MFLLeagueInfo.startWeek = e.league.startWeek),
            (MFLLeagueInfo.endWeek = e.league.endWeek),
            (MFLLeagueInfo.lastRegularSeasonWeek = e.league.lastRegularSeasonWeek);
        try {
            MFLLeagueInfo.bestLineup = e.league.bestLineup;
        } catch (e) {
            MFLLeagueInfo.bestLineup = "No";
        }
        if (
            ((MFLCurrentWeek = liveScoringWeek < 1 ? 1 : liveScoringWeek),
            (MFLEndWeek = parseInt(MFLLeagueInfo.endWeek)),
            MFLCurrentWeek > MFLEndWeek && (MFLCurrentWeek = MFLEndWeek),
            !(MFLLiveMode = !(MFLCurrentWeek <= completedWeek)) && MFLCurrentWeek === completedWeek)
        ) {
            var a = baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random();
            $.ajax({ type: "GET", url: a, weeklyResultsData: { USER_ID: userCookieValue } }).done(function (e) {
                var a = !1;
                if (!a)
                    try {
                        for (var t = 0; t < e.weeklyResults.matchup.length && !a; t++) 0 !== parseFloat(e.weeklyResults.matchup[t].franchise[0].score) && (a = !0), 0 !== parseFloat(e.weeklyResults.matchup[t].franchise[1].score) && (a = !0);
                    } catch (e) {}
                if (!a)
                    try {
                        0 !== parseFloat(e.weeklyResults.matchup.franchise[0].score) && (a = !0), 0 !== parseFloat(e.weeklyResults.matchup.franchise[1].score) && (a = !0);
                    } catch (e) {}
                if (!a)
                    try {
                        for (t = 0; t < e.weeklyResults.franchise.length && !a; t++) 0 !== parseFloat(e.weeklyResults.franchise[t].score) && (a = !0);
                    } catch (e) {}
                if (!a)
                    try {
                        0 !== parseFloat(e.weeklyResults.franchise.score) && (a = !0);
                    } catch (e) {}
                a || ((MFLLiveMode = !0), (completedWeek -= 1));
            });
        }
        for (var t = 0; t < e.league.franchises.franchise.length; t++) 1 === e.league.franchises.franchise[t].iscommish && (MFLLeagueInfo.commishFid = e.league.franchises.franchise[t].id);
        if (
            ((MFLLeagueInfo.franchises = e.league.franchises.franchise.length),
            (e = null),
            (precision = MFLLeagueInfo.precision),
            (commishfranchise_id = MFLLeagueInfo.commishFid),
            "" ===
                (currentAllPlayTeam =
                    "undefined" == typeof franchise_id ? ("0000" === commishfranchise_id ? "0001" : commishfranchise_id) : "0000" === franchise_id ? ("0000" === commishfranchise_id ? "0001" : commishfranchise_id) : franchise_id) &&
                (currentAllPlayTeam = commishfranchise_id),
            (myUpdateTeam = currentAllPlayTeam),
            MFLLiveMode)
        )
            a = baseURLDynamic + "/" + year + "/export?TYPE=liveScoring&L=" + league_id + "&W=" + MFLCurrentWeek + "&DETAILS=1&JSON=1&rand=" + Math.random();
        else a = baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1&rand=" + Math.random();
        $.ajax({ type: "GET", url: a, apiResults: { USER_ID: userCookieValue } }).done(function (e) {
            if (((rosterData = getMFLStartBenchFromAPI(e)), (e = null), includeProjections)) {
                var a = baseURLDynamic + "/" + year + "/export?TYPE=projectedScores&L=" + league_id + "&W=" + MFLCurrentWeek + "&JSON=1";
                $.ajax({ type: "GET", url: a, projectionsData: { USER_ID: userCookieValue } }).done(function (e) {
                    for (var a = 0; a < e.projectedScores.playerScore.length; a++)
                        0 === e.projectedScores.playerScore[a].score.length ? (fsProjections[e.projectedScores.playerScore[a].id] = 0) : (fsProjections[e.projectedScores.playerScore[a].id] = e.projectedScores.playerScore[a].score);
                    if (((MFLNextWeeksPlayoffMatchupSet = !1), liveScoringWeek >= MFLLeagueInfo.lastRegularSeasonWeek)) {
                        var t = baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + (liveScoringWeek + 1) + "&JSON=1&rand=" + Math.random();
                        $.ajax({ type: "GET", url: t, weeklyResultsData: { USER_ID: userCookieValue } }).done(function (a) {
                            try {
                                a.weeklyResults.matchup.length >= 1 && (MFLNextWeeksPlayoffMatchupSet = !0);
                            } catch (e) {
                                MFLNextWeeksPlayoffMatchupSet = !1;
                            }
                            (a = null), (e = null), (scoreboardTracker[5] = !0), initialHTMLSetup();
                        });
                    } else (scoreboardTracker[5] = !0), initialHTMLSetup();
                });
            } else if (((MFLNextWeeksPlayoffMatchupSet = !1), liveScoringWeek >= MFLLeagueInfo.lastRegularSeasonWeek)) {
                a = baseURLDynamic + "/" + year + "/export?TYPE=weeklyResults&L=" + league_id + "&W=" + (liveScoringWeek + 1) + "&JSON=1&rand=" + Math.random();
                $.ajax({ type: "GET", url: a, weeklyResultsData: { USER_ID: userCookieValue } }).done(function (e) {
                    try {
                        e.weeklyResults.matchup.length >= 1 && (MFLNextWeeksPlayoffMatchupSet = !0);
                    } catch (e) {
                        MFLNextWeeksPlayoffMatchupSet = !1;
                    }
                    (e = null), (projectionsData = null), (scoreboardTracker[5] = !0), initialHTMLSetup();
                });
            } else (scoreboardTracker[5] = !0), initialHTMLSetup();
        });
    });
}
function initialHTMLSetup() {
    scoreboardTracker[0] &&
        scoreboardTracker[1] &&
        scoreboardTracker[2] &&
        scoreboardTracker[3] &&
        scoreboardTracker[4] &&
        scoreboardTracker[5] &&
        ($("#MFLFantasyMatchups").html(createBoxScoreTables()),
        $("#MFLNFLMatchups").html(createNFLBoxScoreTables()),
        $("#myTopTableHolder").html(createMainScoreboardTable()),
        $("#scoreboardHeader").html("Display: <a>Fantasy Scores</a> | <a href='#nflscoreboard' onclick='setMatchupsToDisplay(true);'>NFL Scores</a>"),
        $("#myNavigationHolder").html(createWeeklyNavigation()),
        liveScoringEmpty ||
            $("#myBottomTableHolder").html(
                "<table class='MFLScoreboardLineups'><tbody><tr><td valign='top' id='MFLScoreboardRoadLineup' class='mobile-view' style='vertical-align:top; text-align:left;'></td><td valign='top' id='MFLScoreboardHomeLineup' class='mobile-view' style='vertical-align:top; text-align:right;'></td></tr></tbody></table>"
            ),
        forceJSONUpdate(),
        checkMFLMatchup());
}
function appendScoreboardSkin() {
    $("head").append(
        '<link rel="stylesheet" id="scoreboard_skin" type="text/css" href="' +
            scoreboardStylesheetPath +
            $("#skin")
                .attr("href")
                .substring($("#skin").attr("href").lastIndexOf("/") + 1, $("#skin").attr("href").indexOf(".css")) +
            '.css" />'
    );
}
function checkVarPriority() {
    $("#scoreboardUseIconTD").attr("style", "text-decoration:none"),
        $("#scoreboardUseLogoTD").attr("style", "text-decoration:none"),
        $("#scoreboardUseAbbrevTD").attr("style", "text-decoration:none"),
        $("#scoreboardDefaultTD").attr("style", "text-decoration:none"),
        $("#miniScoreboardUseIconTD").attr("style", "text-decoration:none"),
        $("#miniScoreboardUseLogoTD").attr("style", "text-decoration:none"),
        $("#miniScoreboardUseAbbrevTD").attr("style", "text-decoration:none"),
        $("#miniScoreboardDefaultTD").attr("style", "text-decoration:none"),
        "" !== scoreboardIconBase && "" !== scoreboardIconExt
            ? ($("#scoreboardUseIconTD").attr("style", "text-decoration:line-through"),
              $("#scoreboardUseLogoTD").attr("style", "text-decoration:line-through"),
              $("#scoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"),
              $("#scoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : scoreboardUseIcon
            ? ($("#scoreboardUseLogoTD").attr("style", "text-decoration:line-through"), $("#scoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"), $("#scoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : scoreboardUseLogo
            ? ($("#scoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"), $("#scoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : scoreboardUseAbbrev && $("#scoreboardDefaultTD").attr("style", "text-decoration:line-through"),
        "" !== miniScoreboardIconBase && "" !== miniScoreboardIconExt
            ? ($("#miniScoreboardUseIconTD").attr("style", "text-decoration:line-through"),
              $("#miniScoreboardUseLogoTD").attr("style", "text-decoration:line-through"),
              $("#miniScoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"),
              $("#miniScoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : miniScoreboardUseIcon
            ? ($("#miniScoreboardUseLogoTD").attr("style", "text-decoration:line-through"),
              $("#miniScoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"),
              $("#miniScoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : miniScoreboardUseLogo
            ? ($("#miniScoreboardUseAbbrevTD").attr("style", "text-decoration:line-through"), $("#miniScoreboardDefaultTD").attr("style", "text-decoration:line-through"))
            : miniScoreboardUseAbbrev && $("#miniScoreboardDefaultTD").attr("style", "text-decoration:line-through");
}
function getScoreboardTestConsole() {
    if (includeProjections) var e = " checked='checked'";
    else e = "";
    if (includeSOS) var a = " checked='checked'";
    else a = "";
    if (includeStarterTotals) var t = " checked='checked'";
    else t = "";
    if (includeBenchTotals) var r = " checked='checked'";
    else r = "";
    if (allPlaySetup) var o = " checked='checked'";
    else o = "";
    if (hideTiebreakingPlayer) var n = " checked='checked'";
    else n = "";
    if (useNFLIconInPlayerTable) var s = " checked='checked'";
    else s = "";
    if (useMFLIconInPlayerTable) var i = " checked='checked'";
    else i = "";
    if (importScoreboardSkin) var l = " checked='checked'";
    else l = "";
    if (scoreboardUseIcon) var c = " checked='checked'";
    else c = "";
    if (scoreboardUseLogo) var d = " checked='checked'";
    else d = "";
    if (scoreboardUseAbbrev) var p = " checked='checked'";
    else p = "";
    if (miniScoreboardUseIcon) var h = " checked='checked'";
    else h = "";
    if (miniScoreboardUseLogo) var u = " checked='checked'";
    else u = "";
    if (miniScoreboardUseAbbrev) var m = " checked='checked'";
    else m = "";
    if (scoreboardRoadImageFlip) var f = " checked='checked'";
    else f = "";
    if (scoreboardHomeImageFlip) var y = " checked='checked'";
    else y = "";
    var g = "";
    return (
        (g += "<div id='MFLTestParameters'>"),
        (g += "<table align='center' cellpadding='0' cellspacing='0' id='homepagecolumns'><tbody>"),
        (g += "<tr>"),
        (g += " <td width='33%' class='homepagecolumn' id='homepagecolumn1'>"),
        (g += "  <div style='position:relative'><div class='mobile-wrap'><table align='center' cellspacing='1' class='homepagemodule report'><tbody>"),
        (g += "   <tr><th>General User Settings</th></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td>var scoreboardName = <input type='textbox' name='scoreboardNameCheck' id='scoreboardNameCheck' size='20' value='" +
            scoreboardName +
            "' style='vertical-align:middle' onblur='scoreboardName=document.getElementById(\"scoreboardNameCheck\").value;checkMFLMatchup()' />;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            l +
            ' onclick=\'importScoreboardSkin=this.checked;$("#importScoreboardSkinCheckValue").html((this.checked)?"true":"false");(this.checked)?appendScoreboardSkin():$("#scoreboard_skin").remove();updateCurrentWeekSetup(MFLCurrentWeek);\' />var importScoreboardSkin = <span id=\'importScoreboardSkinCheckValue\'>' +
            importScoreboardSkin +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            e +
            ' onclick=\'includeProjections=this.checked;$("#projectionsCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var includeProjections = <span id=\'projectionsCheckValue\'>' +
            includeProjections +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            a +
            ' onclick=\'includeSOS=this.checked;$("#sosCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var includeSOS = <span id=\'sosCheckValue\'>' +
            includeSOS +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            t +
            ' onclick=\'includeStarterTotals=this.checked;$("#starterTotalsCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var includeStarterTotals = <span id=\'starterTotalsCheckValue\'>' +
            includeStarterTotals +
            "</span>; <span class='warning'>//FANTASY ONLY</span></td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            r +
            ' onclick=\'includeBenchTotals=this.checked;$("#benchTotalsCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var includeBenchTotals = <span id=\'benchTotalsCheckValue\'>' +
            includeBenchTotals +
            "</span>; <span class='warning'>//FANTASY ONLY</span></td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            o +
            ' onclick=\'allPlaySetup=this.checked;$("#allPlaySetupCheckValue").html((this.checked)?"true":"false");updateCurrentWeekSetup(MFLCurrentWeek);\' />var allPlaySetup = <span id=\'allPlaySetupCheckValue\'>' +
            allPlaySetup +
            "</span>; <span class='warning'>//FANTASY ONLY</span></td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            n +
            ' onclick=\'hideTiebreakingPlayer=this.checked;$("#hideTiebreakingPlayerCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var hideTiebreakingPlayer = <span id=\'hideTiebreakingPlayerCheckValue\'>' +
            hideTiebreakingPlayer +
            "</span>; <span class='warning'>//FANTASY ONLY</span></td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            s +
            ' onclick=\'useNFLIconInPlayerTable=this.checked;$("#useNFLIconInPlayerTableCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var useNFLIconInPlayerTable = <span id=\'useNFLIconInPlayerTableCheckValue\'>' +
            useNFLIconInPlayerTable +
            "</span>; <span class='warning'>//FANTASY ONLY</span></td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            i +
            ' onclick=\'useMFLIconInPlayerTable=this.checked;$("#useMFLIconInPlayerTableCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var useMFLIconInPlayerTable = <span id=\'useMFLIconInPlayerTableCheckValue\'>' +
            useMFLIconInPlayerTable +
            "</span>; <span class='warning'>//NFL ONLY</span></td></tr>"),
        (g += "  </tbody></table></div></div>"),
        (g += " </td>"),
        (g += " <td width='33%' class='homepagecolumn' id='homepagecolumn2'>"),
        (g += "  <div style='position:relative'><div class='mobile-wrap'><table align='center' cellspacing='1' class='homepagemodule report'><tbody>"),
        (g += "   <tr><th>Main Scoreboard MFL Franchise Images Priority</th></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td>var scoreboardIconBase = <input type='textbox' name='scoreboardIconBaseCheck' id='scoreboardIconBaseCheck' size='20' value='" +
            scoreboardIconBase +
            "' placeholder='//fullpath/iconbase' style='vertical-align:middle' onblur='scoreboardIconBase=document.getElementById(\"scoreboardIconBaseCheck\").value;checkVarPriority();checkMFLMatchup()' />;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td>var scoreboardIconExt = <input type='textbox' name='scoreboardIconExtCheck' id='scoreboardIconExtCheck' size='5' value='" +
            scoreboardIconExt +
            "' placeholder='png/gif/jpg' style='vertical-align:middle' onblur='scoreboardIconExt=document.getElementById(\"scoreboardIconExtCheck\").value;checkVarPriority();checkMFLMatchup()' />;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td id='scoreboardUseIconTD'><input style='vertical-align:middle' type='checkbox'" +
            c +
            ' onclick=\'scoreboardUseIcon=this.checked;$("#scoreboardUseIconCheckValue").html((this.checked)?"true":"false");checkVarPriority();checkMFLMatchup();\' />var scoreboardUseIcon = <span id=\'scoreboardUseIconCheckValue\'>' +
            scoreboardUseIcon +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td id='scoreboardUseLogoTD'><input style='vertical-align:middle' type='checkbox'" +
            d +
            ' onclick=\'scoreboardUseLogo=this.checked;$("#scoreboardUseLogoCheckValue").html((this.checked)?"true":"false");checkVarPriority();checkMFLMatchup();\' />var scoreboardUseLogo = <span id=\'scoreboardUseLogoCheckValue\'>' +
            scoreboardUseLogo +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td id='scoreboardUseAbbrevTD'><input style='vertical-align:middle' type='checkbox'" +
            p +
            ' onclick=\'scoreboardUseAbbrev=this.checked;$("#scoreboardUseAbbrevCheckValue").html((this.checked)?"true":"false");checkVarPriority();checkMFLMatchup();\' />var scoreboardUseAbbrev = <span id=\'scoreboardUseAbbrevCheckValue\'>' +
            scoreboardUseAbbrev +
            "</span>;</td></tr>"),
        (g += "   <tr class='eventablerow'><td id='scoreboardDefaultTD'><span class='warning' style='font-style:italic'>Default: Full Franchise Name</span></td></tr>"),
        (g += "  </tbody></table></div></div>"),
        (g += "  <div style='position:relative'><div class='mobile-wrap'><table align='center' cellspacing='1' class='homepagemodule report'><tbody>"),
        (g += "   <tr><th>Main Scoreboard Other Image Settings</th></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            f +
            ' onclick=\'scoreboardRoadImageFlip=this.checked;$("#scoreboardRoadImageFlipCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var scoreboardRoadImageFlip = <span id=\'scoreboardRoadImageFlipCheckValue\'>' +
            scoreboardRoadImageFlip +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td><input style='vertical-align:middle' type='checkbox'" +
            y +
            ' onclick=\'scoreboardHomeImageFlip=this.checked;$("#scoreboardHomeImageFlipCheckValue").html((this.checked)?"true":"false");checkMFLMatchup();\' />var scoreboardHomeImageFlip = <span id=\'scoreboardHomeImageFlipCheckValue\'>' +
            scoreboardHomeImageFlip +
            "</span>;</td></tr>"),
        (g += "   <tr class='oddtablerow'><td> </td></tr>"),
        (g += "  </tbody></table></div></div>"),
        (g += " </td>"),
        (g += " <td width='33%' class='homepagecolumn' id='homepagecolumn3'>"),
        (g += "  <div style='position:relative'><div class='mobile-wrap'><table align='center' cellspacing='1' class='homepagemodule report'><tbody>"),
        (g += "   <tr><th>Mini Scoreboard MFL Franchise Images Priority</th></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td>var miniScoreboardIconBase = <input type='textbox' name='miniScoreboardIconBaseCheck' id='miniScoreboardIconBaseCheck' size='20' value='" +
            miniScoreboardIconBase +
            "' placeholder='//fullpath/iconbase' style='vertical-align:middle' onblur='miniScoreboardIconBase=document.getElementById(\"miniScoreboardIconBaseCheck\").value;checkVarPriority();updateCurrentWeekSetup(MFLCurrentWeek);' />;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td>var miniScoreboardIconExt = <input type='textbox' name='miniScoreboardIconExtCheck' id='miniScoreboardIconExtCheck' size='5' value='" +
            miniScoreboardIconExt +
            "' placeholder='png/gif/jpg' style='vertical-align:middle' onblur='miniScoreboardIconExt=document.getElementById(\"miniScoreboardIconExtCheck\").value;checkVarPriority();updateCurrentWeekSetup(MFLCurrentWeek);' />;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td id='miniScoreboardUseIconTD'><input style='vertical-align:middle' type='checkbox'" +
            h +
            ' onclick=\'miniScoreboardUseIcon=this.checked;$("#miniScoreboardUseIconCheckValue").html((this.checked)?"true":"false");checkVarPriority();updateCurrentWeekSetup(MFLCurrentWeek);\' />var miniScoreboardUseIcon = <span id=\'miniScoreboardUseIconCheckValue\'>' +
            miniScoreboardUseIcon +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td id='miniScoreboardUseLogoTD'><input style='vertical-align:middle' type='checkbox'" +
            u +
            ' onclick=\'miniScoreboardUseLogo=this.checked;$("#miniScoreboardUseLogoCheckValue").html((this.checked)?"true":"false");checkVarPriority();updateCurrentWeekSetup(MFLCurrentWeek);\' />var miniScoreboardUseLogo = <span id=\'miniScoreboardUseLogoCheckValue\'>' +
            miniScoreboardUseLogo +
            "</span>;</td></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td id='miniScoreboardUseAbbrevTD'><input style='vertical-align:middle' type='checkbox'" +
            m +
            ' onclick=\'miniScoreboardUseAbbrev=this.checked;$("#miniScoreboardUseAbbrevCheckValue").html((this.checked)?"true":"false");checkVarPriority();updateCurrentWeekSetup(MFLCurrentWeek);\' />var miniScoreboardUseAbbrev = <span id=\'miniScoreboardUseAbbrevCheckValue\'>' +
            miniScoreboardUseAbbrev +
            "</span>;</td></tr>"),
        (g += "   <tr class='eventablerow'><td id='miniScoreboardDefaultTD'><span class='warning' style='font-style:italic'>Default: Full Franchise Name</span></td></tr>"),
        (g += "  </tbody></table></div></div>"),
        (g += "  <div style='position:relative'><div class='mobile-wrap'><table align='center' cellspacing='1' class='homepagemodule report'><tbody>"),
        (g += "   <tr><th>NFL Image Settings</th></tr>"),
        (g +=
            "   <tr class='oddtablerow'><td>var nflLogoPath = <input type='textbox' name='nflLogoPathCheck' id='nflLogoPathCheck' size='20' value='" +
            nflLogoPath +
            "' placeholder='//fullpath/' style='vertical-align:middle' onblur='nflLogoPath=document.getElementById(\"nflLogoPathCheck\").value;updateCurrentWeekSetup(MFLCurrentWeek);' />;</td></tr>"),
        (g +=
            "   <tr class='eventablerow'><td>var nflLogoExt = <input type='textbox' name='nflLogoExtCheck' id='nflLogoExtCheck' size='5' value='" +
            nflLogoExt +
            "' placeholder='png/gif/jpg' style='vertical-align:middle' onblur='nflLogoExt=document.getElementById(\"nflLogoExtCheck\").value;updateCurrentWeekSetup(MFLCurrentWeek);' />;</td></tr>"),
        (g += "   <tr class='oddtablerow'><td> </td></tr>"),
        (g += "  </tbody></table></div></div>"),
        (g += " </td>"),
        (g += "</tr>"),
        (g += "</tbody></table>"),
        (g += "</div>")
    );
}
function createScoreboardContainer() {
    $("body").append("<div id='boxscoreHframe' style='display:none'></div>"),
        scoreboardTestMode && ($("#outerMFLScoreboardDiv").append(getScoreboardTestConsole()), checkVarPriority()),
        $("#outerMFLScoreboardDiv").append("<div class='top_sb_container'><h3 id='scoreboardHeader'></h3><div id='myNavigationHolder'></div></div>"),
        $("#outerMFLScoreboardDiv").append("<div id='MFLRestartHolder' class='report' style='display:none;text-align:center;padding: 15px;max-width: 300px;'></div>"),
        $("#outerMFLScoreboardDiv").append("<div id='MFLBoxHolder'></div>"),
        $("#MFLBoxHolder").append("<div id='MFLFantasyMatchups' class='report' style='display:inline-block'></div>"),
        $("#MFLBoxHolder").append("<div id='MFLNFLMatchups' class='report' style='display:none'></div>"),
        $("#outerMFLScoreboardDiv").append("<table class='MFLOuterTable report'><tbody><tr><td id='myTopTableHolder'></td></tr><tr><td id='myBottomTableHolder'></td></tr></tbody></table>"),
        $("#outerMFLScoreboardDiv").wrapInner("<center></center>"),
        $(".mobile-wrap #outerMFLScoreboardDiv").unwrap();
}
function forceJSONUpdate() {
    try {
        $("#boxscoreHframe").html("<iframe src='" + baseURLDynamic + "/" + year + "/live_scoring_summary?L=" + league_id + "&App=bs' style='width: 0; height: 0; border: 0px;'></iframe>"), $("#boxscoreHframe").html();
    } catch (e) {}
    forceJSONUpdateTimer();
}
function forceJSONUpdateTimer() {
    forceJSONUpdateCount < 60 ? (forceJSONUpdateCount++, setTimeout("forceJSONUpdateTimer()", 1e3)) : ((forceJSONUpdateCount = 0), forceJSONUpdate());
}
function checkLoadingScreen() {
    includeLoadingScreen && doScoreboardLoadingScreen();
}
if (
    ((jQuery.fn.MFLpopCenter = function (e, a) {
        return (
            (e = e ? this.parent() : window),
            a
                ? this.css({ position: "absolute", top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px" })
                : this.css({ position: "absolute", top: ($(e).height() - this.outerHeight()) / 2 + $(e).scrollTop() + "px", left: ($(e).width() - this.outerWidth()) / 2 + $(e).scrollLeft() + "px" }),
            this
        );
    }),
    location.href.indexOf("MODULE=MESSAGE") > 0 || location.href.indexOf("/message") > 0 || location.href.indexOf("SEQNO=") > 0)
) {
    var MFLCurrentWeek,
        MFLEndWeek,
        MFLLiveMode,
        liveScoringEmpty = !1,
        forceJSONUpdateCount = 0,
        MFLLeagueInfo = new Array(),
        MFLLiveScoringMatchups = new Array(),
        MFLNFLLiveScoringMatchups = new Array(),
        MFLPlayerInfo = new Array(),
        MFLInjuryInfo = new Array(),
        MFLRosterInfo = new Array(),
        MFLTeamWLT = new Array(),
        MFLNFLTeamWLT = new Array(),
        rosterData = new Array(),
        fsProjections = new Array(),
        doubleHeader = new Array(),
        playerUpdates = new Array(),
        nflTeamUpdate = new Array(),
        playerUpdateHistory = new Array(),
        futureLineup = new Array(),
        matchupsDisplayedIsFantasy = !0;
    (playerUpdates[0] = new Array()), (playerUpdates[1] = new Array());
    var myMainScoreboardTimer,
        mySecondsTimer,
        MFLNoData = !1,
        MFLNextWeeksPlayoffMatchupSet = !1,
        tempAllPlayCheck = !1,
        scoreboardFirstUpdate = !0,
        showBenchTracker = new Array(),
        scoreboardFirstKickoff = new Array(),
        currentGameHilighted = 0,
        currentNFLGameHilighted = -1,
        lastPlayerUpdate = 0,
        currentAllPlayTeam = "0001",
        myLoopCount = 0,
        mySecondsCount = 0,
        userCookieValue = getMFLCookieValue("USER_ID"),
        precision = 0,
        commishfranchise_id = "0001",
        myUpdateTeam = currentAllPlayTeam,
        myOppUpdateTeam = "",
        scoreboardTracker = new Array(!1, !1, !1, !1, !1, !1),
        myDocumentWrite = "";
    document.getElementById("skin") &&
        importScoreboardSkin &&
        (myDocumentWrite +=
            '<link rel="stylesheet" id="scoreboard_skin" type="text/css" href="' +
            scoreboardStylesheetPath +
            $("#skin")
                .attr("href")
                .substring($("#skin").attr("href").lastIndexOf("/") + 1, $("#skin").attr("href").indexOf(".css")) +
            '.css" />'),
        (myDocumentWrite += '<div id="outerMFLScoreboardDiv" style="visibility:hidden"></div>'),
        document.write(myDocumentWrite),
        setTimeout("checkLoadingScreen()", 200),
        $(document).ready(function () {
            createScoreboardContainer(), initialJSONCalls();
        });
} else
    document.write(
        '<table align="center" cellspacing="1" class="homepagemodule report"><caption><span>Custom Scoreboard</span></caption><tbody><tr><th>Failure Notice</th></tr><tr class="oddtablerow"><td><p>Custom Scoreboard can not be placed on the home page.</p><p>To use you must create a link to the home page module containing the script.</p></td></tr></tbody></table>'
    );
