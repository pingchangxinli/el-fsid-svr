package com.el.demo.controller;

import com.el.core.storage.AbstractStorageManager;
import com.el.core.storage.PreviewService;
import com.el.core.storage.StorageFileEntry;
import com.el.core.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/4
 */
@Profile("demo")
@Controller
@RequestMapping("/demo/fm")
public class DemoStorageController extends AbstractStorageManager {

    @Autowired
    public DemoStorageController(StorageService storageService, PreviewService previewService) {
        super(storageService, previewService);
    }

    @GetMapping("/repos/{repo}/owned")
    @Override
    public ResponseEntity<Integer> owned(String repoName) {
        return super.owned(repoName);
    }

    @GetMapping("/repos/{repo}/files")
    @Override
    public ResponseEntity<List<StorageFileEntry>> files(@PathVariable("repo") String repoName) {
        return super.files(repoName);
    }

    @PostMapping("/repos/{repo}/files/{file}/erase")
    @ResponseBody
    @Override
    public void erase(@PathVariable("repo") String repoName, @PathVariable("file") String fileName) {
        super.erase(repoName, fileName);
    }

    @GetMapping("/repos/{repo}/files/{file:.+}")
    @Override
    public ResponseEntity<Resource> file(
            @PathVariable("repo") String repoName, @PathVariable("file") String fileName) {
        return super.file(repoName, fileName);
    }

    @GetMapping("/repos/{repo}/files/{file:.+}/preview")
    @Override
    public ResponseEntity<Resource> preview(
            @PathVariable("repo") String repoName, @PathVariable("file") String fileName) {
        return super.preview(repoName, fileName);
    }

    @PostMapping("/repos/{repo}/store")
    @ResponseStatus(HttpStatus.OK)
    @Override
    public void store(@PathVariable("repo") String repoName, MultipartFile file) {
        super.store(repoName, file);
    }

}
