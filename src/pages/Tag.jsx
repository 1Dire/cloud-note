import React, { useState } from "react";
import { Badge, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FcFinePrint } from "react-icons/fc";

const dummyLogs = [
    {
        title: "클라우드란 무엇인가?",
        tags: ["클라우드 컴퓨팅", "온프레미스", "IaaS", "PaaS", "SaaS"],
        to: "whatIsCloud"
    },
];

const Tag = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // 전체 태그 목록 (중복 제거)
    const allTags = Array.from(new Set(dummyLogs.flatMap((log) => log.tags)));

    // 태그 클릭 시 해당 log.to 경로로 이동
    const handleTagClick = (tag) => {
        const matchedLog = dummyLogs.find((log) => log.tags.includes(tag));
        if (matchedLog?.to) {
            navigate(`/${matchedLog.to}`);
        }
    };

    // 검색어에 따라 log 필터링
    const filteredLogs = dummyLogs.filter((log) => {
        const matchTitle = log.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTags = log.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchTitle || matchTags;
    });

    return (
        <div>
            {/* 헤더 */}
            <h1 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-sky-500">
                <FcFinePrint className="inline-block mr-2 align-middle" />
                태그 및 키워드로 학습 기록 검색
            </h1>

            {/* 검색 입력창 */}
            <div className="mb-4">
                <TextInput
                    icon={HiSearch}
                    type="text"
                    placeholder="제목 또는 태그로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sizing="md"
                />
            </div>

            {/* 태그 뱃지 목록 */}
            <div className="flex flex-wrap gap-2 mb-6">
                {allTags.map((tag, i) => (
                    <Badge
                        key={i}
                        color="indigo"
                        size="sm"
                        onClick={() => handleTagClick(tag)}
                        className="cursor-pointer text-indigo-600 dark:text-sky-500"
                    >
                        #{tag}
                    </Badge>
                ))}
            </div>

            {/* 검색 결과 리스트 */}
            <ul className="space-y-4">
                {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, i) => (
                        <li
                            key={i}
                            className="border-b border-gray-300 dark:border-gray-700 pb-2"
                        >
                            <p className="font-semibold text-lg">{log.title}</p>
                            <div className="mt-1 flex gap-2 flex-wrap">
                                {log.tags.map((t, j) => (
                                    <Badge
                                        key={j}
                                        color="gray"
                                        size="xs"
                                        className="cursor-pointer"
                                        onClick={() => handleTagClick(t)}
                                    >
                                        #{t}
                                    </Badge>
                                ))}
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center">일치하는 기록이 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default Tag;
