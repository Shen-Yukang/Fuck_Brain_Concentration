/**
 * 语音配置常量 - 统一管理所有语音类型和默认文本
 */
export interface VoiceOption {
    value: string;
    label: string;
    defaultText: string;
}
export declare enum VoiceType {
    ZH_FEMALE_LINJIANVHAI = "zh_female_linjianvhai_moon_bigtts",
    ZH_FEMALE_YUANQINVYOU = "zh_female_yuanqinvyou_moon_bigtts",
    ZH_FEMALE_GAOLENGYUJIE = "zh_female_gaolengyujie_moon_bigtts",
    ZH_FEMALE_TIANMEIXIAOYUAN = "zh_female_tianmeixiaoyuan_moon_bigtts",
    ZH_FEMALE_KAILANGJIEJIE = "zh_female_kailangjiejie_moon_bigtts",
    MULTI_FEMALE_SHUANGKUAISISI = "multi_female_shuangkuaisisi_moon_bigtts",
    MULTI_FEMALE_GAOLENGYUJIE = "multi_female_gaolengyujie_moon_bigtts"
}
export declare const DEFAULT_TEXTS: {
    readonly CHINESE: "呀~ 看你专注的样子，眼睛亮亮的，真的超有魅力呢！这股认真劲儿，一定能收获满满！加油哦，我就悄悄在旁边陪你一起，专注冲鸭！";
    readonly JAPANESE: "いやー、集中しているところを見ると、目がキラキラしていて、超魅力的ですよね!この本気さ、きっと手に入ります!頑張って、私はそっとそばであなたに付き添って一緒に、集中してアヒルを沖ます!愛してますよ";
    readonly FALLBACK: "专注模式已启动，加油保持专注！";
};
export declare const VOICE_OPTIONS: VoiceOption[];
/**
 * 根据语音类型获取默认文本
 */
export declare function getDefaultTextByVoiceType(voiceType: string): string;
/**
 * 检查是否为开始语音文本
 * 目的只是为了缓存，所以只需要检查是否包含开始语音的关键词
 * 有点 hacky，但是目前应该够用了
 */
export declare function isStartVoiceText(text: string): boolean;
/**
 * 获取语音选项的标签
 */
export declare function getVoiceLabelByType(voiceType: string): string;
//# sourceMappingURL=voiceConfig.d.ts.map